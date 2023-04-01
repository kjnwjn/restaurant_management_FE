const fs = require("fs");
const path = require("path");
const mime = require("mime");
const excel = require("excel4node");
const workbook = new excel.Workbook();
const jwt = require("jsonwebtoken");
const productModel = require("../../models/product");
const supplierModel = require("../../models/supplier");
const accountModel = require("../../models/account");
const customerModel = require("../../models/customer");
const transactionModel = require("../../models/transaction");
const phoneNumberValidator = require("validate-phone-number-node-js");
const { log } = require("console");
const transaction = require("../../models/transaction");

module.exports = {
    transactionNew: async (req, res, next) => {
        // #swagger.tags = ['Transaction']
        try {
            const lengthID = 10;
            const transactionID = Math.floor(Math.pow(10, lengthID - 1) + Math.random() * 9 * Math.pow(10, lengthID - 1));
            const token = req.query.token || req.headers["x-access-token"];
            const currentSession = jwt.verify(token, process.env.SECRET_KEY);
            const unpaidTransaction = await transactionModel.findOne({
                cashierCode: currentSession.data.userCode,
                payStatus: false,
            });
            if (unpaidTransaction) {
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "There is a transaction which has not been paid. Please finish this transaction first!",
                        vn: "Tồn tại một giao dịch chưa thanh toán, vui lòng hoàn tất giao dịch này.",
                    },
                    unpaidTransaction,
                });
            }
            const transaction = new transactionModel({
                transactionID,
                cashierCode: currentSession.data.userCode,
                cashierName: currentSession.data.fullName,
            });
            transaction.save();
            return res.status(200).json({
                status: true,
                statusCode: 200,
                msg: {
                    en: "A transaction is already to pay!",
                    vn: "Một giao dịch mới sẵn sàng để thanh toán.",
                },
                transaction,
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                statusCode: 500,
                msg: { en: "Interal Server Error" },
                error: error.message,
            });
        }
    },
    transactionGetAll: async (req, res, next) => {
        // #swagger.tags = ['Transaction']
        const transactionQueryAll = await transactionModel.find({}).sort({ updatedAt: -1 });
        return res.status(200).json({
            status: true,
            statusCode: 200,
            msg: { en: "Transaction list" },
            data: transactionQueryAll,
        });
    },
    transactionGetDetail: async (req, res, next) => {
        // #swagger.tags = ['Transaction']
        try {
            const transactionID = parseInt(req.params.transactionID) || 0;
            const transactionQuery = await transactionModel.findOne({
                transactionID,
            });
            if (!transactionQuery) {
                return res.status(404).json({
                    status: false,
                    statusCode: 404,
                    msg: {
                        en: `This transaction not found. Please create a new transaction!`,
                        vn: `Giao dịch này không tồn tại, vui lòng thực hiện lại.`,
                    },
                });
            }
            return res.status(200).json({
                status: true,
                statusCode: 200,
                msg: {
                    en: `Get transaction ${transactionID} successfully!`,
                    vn: `Thông tin chi tiết của giao dịch ${transactionID}`,
                },
                transactionQuery,
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                statusCode: 500,
                msg: { en: "Interal Server Error" },
                error: error.message,
            });
        }
    },
    transactionCancel: async (req, res, next) => {
        // #swagger.tags = ['Transaction']
        try {
            const transactionID = parseInt(req.params.transactionID) || 0;
            const transactionQuery = await transactionModel.findOne({
                transactionID,
            });
            if (!transactionID) {
                return res.status(404).json({
                    status: false,
                    statusCode: 404,
                    msg: {
                        en: `TransactionID product is require!`,
                        vn: `Mã giao dịch là bắt buộc.`,
                    },
                });
            }
            if (!transactionQuery) {
                return res.status(404).json({
                    status: false,
                    statusCode: 404,
                    msg: {
                        en: `This transaction not found. Please create a new transaction!`,
                        vn: `Giao dịch này không tồn tại, vui lòng thực hiện lại.`,
                    },
                });
            }
            await transactionModel.remove({ transactionID });
            return res.status(200).json({
                status: true,
                statusCode: 200,
                msg: {
                    en: `TransactionID "${transactionID}" has been removed successfully!`,
                    vn: `Giao dịch "${transactionID}" đã được gỡ bỏ thành công.`,
                },
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                statusCode: 500,
                msg: { en: "Interal Server Error" },
                error: error.message,
            });
        }
    },
    transactionOrder: async (req, res, next) => {
        // #swagger.tags = ['Transaction']
        try {
            const transactionID = parseInt(req.params.transactionID) || 0;
            const barcode = req.body.barcode ? req.body.barcode.toUpperCase() : null;
            const productQtyToOrder = req.body.qty ? parseInt(req.body.qty) : 1;
            const productQuery = await productModel.findOne({ barcode });
            const transactionQuery = await transactionModel.findOne({ transactionID });
            if (!barcode) {
                return res.status(404).json({
                    status: false,
                    statusCode: 404,
                    msg: {
                        en: `Barcode product is require!`,
                        vn: `Mã vạch sản phẩm là bắt buộc.`,
                    },
                });
            }
            let cart = transactionQuery.details || [];
            if (!productQuery) {
                return res.status(404).json({
                    status: false,
                    statusCode: 404,
                    msg: {
                        en: `Product barcode "${barcode}" not found or has been removed, contact developer for more detail!`,
                        vn: `Không tìm thấy mã vạch sản phẩm "${barcode}", hoặc đã bị gỡ bỏ, vui lòng liên hệ quản trị viên.`,
                    },
                });
            }
            if (productQuery.quantity <= 0) {
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: `Product barcode "${barcode}" does not have a quantity for this transaction!`,
                        vn: `Sản phẩm có mã vạch "${barcode}" không đủ số lượng để cung cấp cho giao dịch này.`,
                    },
                });
            }
            if (cart.length > 0) {
                const productFound = cart.find((product) => product.barcode == barcode);
                if (productFound && productFound.qty >= productQuery.quantity) {
                    return res.status(200).json({
                        status: false,
                        statusCode: 200,
                        msg: {
                            en: `Product barcode "${barcode}" does not have a quantity for this transaction!`,
                            vn: `Sản phẩm có mã vạch "${barcode}" không đủ số lượng để cung cấp cho giao dịch này.`,
                        },
                    });
                }
            }
            if (cart.length == 0) {
                cart.push({
                    barcode: productQuery.barcode,
                    productName: productQuery.productName,
                    unitCost: productQuery.unitCost,
                    qty: productQtyToOrder,
                });
            } else {
                const found = cart.some((el) => el.barcode === barcode);
                if (found) {
                    cart.forEach((item) => {
                        if (item.barcode == barcode) item.qty += productQtyToOrder;
                    });
                } else {
                    cart.push({
                        barcode: productQuery.barcode,
                        productName: productQuery.productName,
                        unitCost: productQuery.unitCost,
                        qty: productQtyToOrder,
                    });
                }
            }
            // let disCount = transactionQuery.disCount;
            // if (transactionQuery.customerID) {
            //     const customerQuery = await customerModel.findOne({ customerID: transactionQuery.customerID });
            //     if (customerQuery) {
            //         disCount = customerQuery.point;
            //     }
            // }
            await transactionModel.findOneAndUpdate(
                { transactionID },
                {
                    details: cart,
                    // disCount,
                    subTotal: transactionQuery.subTotal + productQuery.unitCost * productQtyToOrder,
                }
            );
            return res.status(200).json({
                status: true,
                statusCode: 200,
                msg: {
                    en: "A new product has been added into this transaction!",
                    vn: "Một sản phẩm đã được thêm vào giao dịch này.",
                },
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                statusCode: 500,
                msg: { en: "Interal Server Error" },
                error: error.message,
            });
        }
    },
    transactionToPay: async (req, res, next) => {
        // #swagger.tags = ['Transaction']
        try {
            const transactionID = parseInt(req.params.transactionID) || 0;
            const transactionQuery = await transactionModel.findOne({
                transactionID,
                payStatus: false,
            });
            if (!transactionID) {
                return res.status(404).json({
                    status: false,
                    statusCode: 404,
                    msg: {
                        en: `TransactionID product is require!`,
                        vn: `Mã giao dịch là bắt buộc.`,
                    },
                });
            }
            if (!transactionQuery) {
                return res.status(404).json({
                    status: false,
                    statusCode: 404,
                    msg: {
                        en: `This transaction not found. Please create a new transaction!`,
                        vn: `Giao dịch này không tồn tại, vui lòng thực hiện lại.`,
                    },
                });
            }
            if (!transactionQuery.subTotal || transactionQuery.subTotal <= 0)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: `This transaction has no product to pay!`,
                        vn: `Giao dịch này không có sản phẩm nào để thanh toán.`,
                    },
                });
            const customerQuery = await customerModel.findOne({ customerID: transactionQuery.customerID });
            let totalPrice = parseInt(transactionQuery.subTotal);
            let cash = req.body.cash ? parseInt(req.body.cash) : 0;
            let disCount,
                changeDue,
                pointToUpdate = 0;
            if (customerQuery && transactionQuery.usePoint) {
                let customerPoint = customerQuery.point;
                if (customerPoint > totalPrice) {
                    disCount = totalPrice;
                    totalPrice = 0;
                    changeDue = cash;
                    pointToUpdate = customerPoint - totalPrice;
                } else {
                    disCount = customerPoint;
                    totalPrice = totalPrice - disCount;
                    pointToUpdate = 0;
                    cash = req.body.cash ? parseInt(req.body.cash) : totalPrice;
                    if (cash < totalPrice)
                        return res.status(200).json({
                            status: false,
                            statusCode: 200,
                            msg: {
                                en: `Transaction faild - Don't have enough money!`,
                                vn: `Giao dịch "${transactionID}" thất bại - không đủ tiền.`,
                            },
                        });
                    changeDue = cash - totalPrice;
                }
                await customerModel.findOneAndUpdate({ customerID: customerQuery.customerID }, { point: pointToUpdate });
            } else {
                cash = req.body.cash ? parseInt(req.body.cash) : transactionQuery.subTotal;
                if (cash < totalPrice)
                    return res.status(200).json({
                        status: false,
                        statusCode: 200,
                        msg: {
                            en: `Transaction faild - Don't have enough money!`,
                            vn: `Giao dịch "${transactionID}" thất bại - không đủ tiền.`,
                        },
                    });
                pointToUpdate = customerQuery ? customerQuery.point + Math.floor(totalPrice / 100) : 0;
                if (customerQuery) await customerModel.findOneAndUpdate({ customerID: customerQuery.customerID }, { point: pointToUpdate });
            }
            changeDue = Math.floor(cash - totalPrice);
            await transactionModel.findOneAndUpdate({ transactionID }, { payStatus: true, cash, changeDue, disCount, totalPrice });
            transactionQuery.details.forEach(async (item) => {
                product = await productModel.findOne({ barcode: item.barcode });
                await productModel.findOneAndUpdate({ barcode: item.barcode }, { quantity: product.quantity - item.qty });
            });
            return res.status(200).json({
                status: true,
                statusCode: 200,
                msg: {
                    en: `Transaction "${transactionID}" has been paid successfully!`,
                    vn: `Giao dịch "${transactionID}" được thanh toán thành công.`,
                },
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                statusCode: 500,
                msg: { en: "Interal Server Error" },
                error: error.message,
            });
        }
    },
    transactionAddCustomer: async (req, res, next) => {
        // #swagger.tags = ['Transaction']
        const customerID = req.body.customerID || null;
        const transactionID = req.params.transactionID || null;
        const customerQuery = await customerModel.findOne({ customerID });
        if (!customerID || !phoneNumberValidator.validate(customerID))
            return res.status(200).json({
                status: false,
                statusCode: 200,
                msg: {
                    en: "Customer's phone number is required and must be a valid phone number.",
                    vn: "Số điện thoại khách hàng là bắt buộc và phải là số điện thoại hợp lệ.",
                },
            });
        if (!customerQuery)
            return res.status(200).json({
                status: false,
                statusCode: 200,
                msg: {
                    en: `${customerID} is not defined as customer. Please create account first.`,
                    vn: `${customerID} chưa được đăng ký thành viên, vui lòng đăng ký trước khi thực hiện.`,
                },
            });
        await transactionModel.findOneAndUpdate({ transactionID }, { customerID: customerID.toUpperCase() });
        return res.status(200).json({
            status: true,
            statusCode: 200,
            msg: {
                en: `${customerQuery.fullName} has been added to this transaction.`,
                vn: `Khách hàng "${customerQuery.fullName}" đã được thêm vào giao dịch này.`,
            },
        });
    },
    transactionTogglePoint: async (req, res, next) => {
        // #swagger.tags = ['Transaction']
        const transactionID = req.params.transactionID || null;
        const transactionQuery = await transactionModel.findOne({ transactionID });
        if (!transactionID) {
            return res.status(200).json({
                status: false,
                statusCode: 200,
                msg: {
                    en: `TransactionID product is require!`,
                    vn: `Mã giao dịch là bắt buộc.`,
                },
            });
        }
        if (!transactionQuery) {
            return res.status(200).json({
                status: false,
                statusCode: 200,
                msg: {
                    en: `This transaction not found. Please create a new transaction!`,
                    vn: `Giao dịch này không tồn tại, vui lòng thực hiện lại.`,
                },
            });
        }
        if (!transactionQuery.customerID) {
            return res.status(200).json({
                status: false,
                statusCode: 200,
                msg: {
                    en: "This transaction has not added customer to use point!",
                    vn: "Giao dịch này chưa thêm khách hàng để sử dụng điểm.",
                },
            });
        }
        await transactionModel.findOneAndUpdate({ transactionID }, { usePoint: !transactionQuery.usePoint, disCount: transactionQuery.usePoint ? transactionQuery.disCount : 0 });
        return res.status(200).json({
            status: true,
            statusCode: 200,
            msg: {
                en: "Apply customer's point status successfully!",
                vn: "Đã thay đổi trạng thái sử dụng điểm của khách hàng thành công.",
            },
        });
    },
    transactionVisualize: async (req, res, next) => {
        // #swagger.tags = ['Transaction']
        try {
            const dateFrom = req.query.dateFrom || "";
            const dateTo = req.query.dateTo || "";
            const validDateFrom = dateFrom.includes("/")
                ? dateFrom.split("/")[2].length == 4
                    ? parseInt(dateFrom.split("/")[0]) > 0 && parseInt(dateFrom.split("/")[0]) <= 31
                        ? dateFrom.split("/")[1] > 0 && dateFrom.split("/")[1] <= 12
                            ? true
                            : false
                        : false
                    : false
                : false;
            const validDateTo = dateTo.includes("/")
                ? dateTo.split("/")[2].length == 4
                    ? parseInt(dateTo.split("/")[0]) > 0 && parseInt(dateTo.split("/")[0]) <= 31
                        ? dateTo.split("/")[1] > 0 && dateTo.split("/")[1] <= 12
                            ? true
                            : false
                        : false
                    : false
                : false;
            if (!dateFrom || !validDateFrom)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "Please confirm what date from, and must be a valid date: DD/MM/YYYY",
                        vn: "Vui lòng xác nhận thời điểm bắt đầu và phải là dữ liệu hợp lệ: DD/MM/YYYY",
                    },
                });
            if (!dateTo || !validDateTo)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "Please confirm the end date, and must be a valid date: DD/MM/YYYY",
                        vn: "Vui lòng xác nhận thời điểm kết thúc và phải là dữ liệu hợp lệ: DD/MM/YYYY",
                    },
                });
            const timeFrom = new Date(parseInt(dateFrom.split("/")[2]), parseInt(dateFrom.split("/")[1]) - 1, parseInt(dateFrom.split("/")[0]), 0, 0, 0);
            const timeTo = new Date(parseInt(dateTo.split("/")[2]), parseInt(dateTo.split("/")[1]) - 1, parseInt(dateTo.split("/")[0]), 23, 59, 59);
            if (timeTo < timeFrom)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "The start date must be lager than the end date.",
                        vn: "Thời điểm kết thúc phải lớn hơn thời điểm bắt đầu.",
                    },
                });
            // Code here=================================================================
            let finalData = [];
            let totalSale = 0;
            const transactionQueryAll = await transactionModel.find({});
            transactionQueryAll.forEach((transaction) => {
                let date = new Date(transaction.createdAt.toISOString());
                let dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                if (date >= timeFrom && date <= timeTo) {
                    totalSale += transaction.totalPrice;
                    finalData.push({
                        dateString,
                        id: transaction.transactionID,
                        cash: transaction.cash,
                        totalProduct: transaction.details.length,
                        totalPrice: transaction.totalPrice,
                    });
                }
            });
            // Code here=================================================================
            return res.status(200).json({
                status: true,
                statusCode: 200,
                timeData: {
                    startDate: timeFrom,
                    endDate: timeTo,
                },
                result: {
                    totalSale,
                    data: finalData,
                },
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                statusCode: 500,
                msg: { en: "Interal Server Error" },
                error: error.message,
            });
        }
    },
    transactionVisualizeExport: async (req, res, next) => {
        // #swagger.tags = ['Transaction']
        try {
            const dateFrom = req.query.dateFrom || "";
            const dateTo = req.query.dateTo || "";
            const validDateFrom = dateFrom.includes("/")
                ? dateFrom.split("/")[2].length == 4
                    ? parseInt(dateFrom.split("/")[0]) > 0 && parseInt(dateFrom.split("/")[0]) <= 31
                        ? dateFrom.split("/")[1] > 0 && dateFrom.split("/")[1] <= 12
                            ? true
                            : false
                        : false
                    : false
                : false;
            const validDateTo = dateTo.includes("/")
                ? dateTo.split("/")[2].length == 4
                    ? parseInt(dateTo.split("/")[0]) > 0 && parseInt(dateTo.split("/")[0]) <= 31
                        ? dateTo.split("/")[1] > 0 && dateTo.split("/")[1] <= 12
                            ? true
                            : false
                        : false
                    : false
                : false;
            if (!dateFrom || !validDateFrom)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "Please confirm what date from, and must be a valid date: DD/MM/YYYY",
                        vn: "Vui lòng xác nhận thời điểm bắt đầu và phải là dữ liệu hợp lệ: DD/MM/YYYY",
                    },
                });
            if (!dateTo || !validDateTo)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "Please confirm the end date, and must be a valid date: DD/MM/YYYY",
                        vn: "Vui lòng xác nhận thời điểm kết thúc và phải là dữ liệu hợp lệ: DD/MM/YYYY",
                    },
                });
            const timeFrom = new Date(parseInt(dateFrom.split("/")[2]), parseInt(dateFrom.split("/")[1]) - 1, parseInt(dateFrom.split("/")[0]), 0, 0, 0);
            const timeTo = new Date(parseInt(dateTo.split("/")[2]), parseInt(dateTo.split("/")[1]) - 1, parseInt(dateTo.split("/")[0]), 23, 59, 59);
            if (timeTo < timeFrom)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "The start date must be lager than the end date.",
                        vn: "Thời điểm kết thúc phải lớn hơn thời điểm bắt đầu.",
                    },
                });
            // Code here=================================================================
            let finalData = [];
            let totalSale = 0;
            const transactionQueryAll = await transactionModel.find({});
            transactionQueryAll.forEach((transaction) => {
                let date = new Date(transaction.createdAt.toISOString());
                let dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                if (date >= timeFrom && date <= timeTo) {
                    totalSale += transaction.totalPrice;
                    finalData.push({
                        dateString,
                        id: transaction.transactionID,
                        cash: transaction.cash,
                        totalProduct: transaction.details.length,
                        totalPrice: transaction.totalPrice,
                    });
                }
            });
            // Code here=================================================================
            const dir = path.resolve(__dirname, "../", "../", "tmp");
            const exportedFile = dir + "/tmp.xlsx";
            !fs.existsSync(dir) ? fs.mkdirSync(dir) : null;
            const worksheet = workbook.addWorksheet("Master");
            const titleStyle = workbook.createStyle({ font: { color: "#000000", size: 12, bold: true } });
            const normalStyle = workbook.createStyle({ font: { color: "#000000", size: 12 } });
            worksheet.cell(1, 1).string("Date").style(titleStyle);
            worksheet.cell(1, 2).string("InvoiceID").style(titleStyle);
            worksheet.cell(1, 3).string("Cash").style(titleStyle);
            worksheet.cell(1, 4).string("Product amount").style(titleStyle);
            worksheet.cell(1, 5).string("Price").style(titleStyle);
            worksheet.column(1).setWidth(20);
            worksheet.column(2).setWidth(20);
            worksheet.column(3).setWidth(50);
            worksheet.column(4).setWidth(20);
            worksheet.column(5).setWidth(30);
            if (finalData && finalData.length > 0) {
                finalData.forEach((transaction, index) => {
                    worksheet
                        .cell(index + 2, 1)
                        .string(transaction.dateString)
                        .style(normalStyle);
                    worksheet
                        .cell(index + 2, 2)
                        .string(transaction.id)
                        .style(normalStyle);
                    worksheet
                        .cell(index + 2, 3)
                        .string(transaction.cash.toString())
                        .style(normalStyle);
                    worksheet
                        .cell(index + 2, 4)
                        .string(transaction.totalProduct.toString())
                        .style(normalStyle);
                    worksheet
                        .cell(index + 2, 5)
                        .string(transaction.totalPrice.toString())
                        .style(normalStyle);
                });
                worksheet
                    .cell(finalData.length + 2, 1)
                    .string("Total sale:")
                    .style(titleStyle);
                worksheet
                    .cell(finalData.length + 2, 5)
                    .string(totalSale.toString())
                    .style(titleStyle);
            } else {
                worksheet.cell(2, 1).string("No data").style(normalStyle);
            }
            workbook.write(exportedFile, (err, stats) => {
                if (!err) {
                    const filename = path.basename(exportedFile);
                    const mimetype = mime.lookup(exportedFile);
                    res.setHeader("Content-disposition", "attachment; filename=" + filename);
                    res.setHeader("Content-type", mimetype);
                    const filestream = fs.createReadStream(exportedFile);
                    filestream.pipe(res);
                } else {
                    res.end("An error occured, please refesh this page!");
                }
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                statusCode: 500,
                msg: { en: "Interal Server Error" },
                error: error.message,
            });
        }
    },
    transactionTopWeek: async (req, res, next) => {
        // #swagger.tags = ['Transaction']
        const transactionQueryAll = await transactionModel.find({});

        const date = new Date();
        const today = new Date((Date.parse(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59)) / 1000) * 1000);
        const day7 = new Date(today - 60 * 60 * 24 * 1000);
        const day6 = new Date(today - 60 * 60 * 24 * 2 * 1000);
        const day5 = new Date(today - 60 * 60 * 24 * 3 * 1000);
        const day4 = new Date(today - 60 * 60 * 24 * 4 * 1000);
        const day3 = new Date(today - 60 * 60 * 24 * 5 * 1000);
        const day2 = new Date(today - 60 * 60 * 24 * 6 * 1000);
        const day1 = new Date(today - 60 * 60 * 24 * 7 * 1000);

        let weekSaleTotal = 0;

        const data = {
            today: {
                dateTime: today,
                daySale: transactionQueryAll.reduce((total, transaction, index) => {
                    if (transaction.createdAt > day7 && transaction.createdAt <= today) {
                        total += transaction.totalPrice;
                    }
                    return total;
                }, 0),
                data: transactionQueryAll.filter((transaction) => {
                    if (transaction.createdAt > day7 && transaction.createdAt <= today) {
                        weekSaleTotal += transaction.totalPrice;
                        return transaction;
                    }
                }),
            },
            day7: {
                dateTime: day7,
                daySale: transactionQueryAll.reduce((total, transaction, index) => {
                    if (transaction.createdAt > day6 && transaction.createdAt <= day7) {
                        total += transaction.totalPrice;
                    }
                    return total;
                }, 0),
                data: transactionQueryAll.filter((transaction) => {
                    if (transaction.createdAt > day6 && transaction.createdAt <= day7) {
                        weekSaleTotal += transaction.totalPrice;
                        return transaction;
                    }
                }),
            },
            day6: {
                dateTime: day6,
                daySale: transactionQueryAll.reduce((total, transaction, index) => {
                    if (transaction.createdAt > day5 && transaction.createdAt <= day6) {
                        total += transaction.totalPrice;
                    }
                    return total;
                }, 0),
                data: transactionQueryAll.filter((transaction) => {
                    if (transaction.createdAt > day5 && transaction.createdAt <= day6) {
                        weekSaleTotal += transaction.totalPrice;
                        return transaction;
                    }
                }),
            },
            day5: {
                dateTime: day5,
                daySale: transactionQueryAll.reduce((total, transaction, index) => {
                    if (transaction.createdAt > day4 && transaction.createdAt <= day5) {
                        total += transaction.totalPrice;
                    }
                    return total;
                }, 0),
                data: transactionQueryAll.filter((transaction) => {
                    if (transaction.createdAt > day4 && transaction.createdAt <= day5) {
                        weekSaleTotal += transaction.totalPrice;
                        return transaction;
                    }
                }),
            },
            day4: {
                dateTime: day4,
                daySale: transactionQueryAll.reduce((total, transaction, index) => {
                    if (transaction.createdAt > day3 && transaction.createdAt <= day4) {
                        total += transaction.totalPrice;
                    }
                    return total;
                }, 0),
                data: transactionQueryAll.filter((transaction) => {
                    if (transaction.createdAt > day3 && transaction.createdAt <= day4) {
                        weekSaleTotal += transaction.totalPrice;
                        return transaction;
                    }
                }),
            },
            day3: {
                dateTime: day3,
                daySale: transactionQueryAll.reduce((total, transaction, index) => {
                    if (transaction.createdAt > day2 && transaction.createdAt <= day3) {
                        total += transaction.totalPrice;
                    }
                    return total;
                }, 0),
                data: transactionQueryAll.filter((transaction) => {
                    if (transaction.createdAt > day2 && transaction.createdAt <= day3) {
                        weekSaleTotal += transaction.totalPrice;
                        return transaction;
                    }
                }),
            },
            day2: {
                dateTime: day2,
                daySale: transactionQueryAll.reduce((total, transaction, index) => {
                    if (transaction.createdAt > day1 && transaction.createdAt <= day2) {
                        total += transaction.totalPrice;
                    }
                    return total;
                }, 0),
                data: transactionQueryAll.filter((transaction) => {
                    if (transaction.createdAt > day1 && transaction.createdAt <= day2) {
                        weekSaleTotal += transaction.totalPrice;
                        return transaction;
                    }
                }),
            },
        };
        res.status(200).json({
            status: true,
            statusCode: 200,
            result: {
                weekSaleTotal,
                data,
            },
        });
    },
};
