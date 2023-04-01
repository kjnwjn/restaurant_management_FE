const xlsxFile = require("read-excel-file/node");
const fs = require("fs");
const path = require("path");
const mime = require("mime");
const excel = require("excel4node");
const workbook = new excel.Workbook();

const productModel = require("../../models/product");
const supplierModel = require("../../models/supplier");

module.exports = {
    productImport: async (req, res, next) => {
        /*
            #swagger.tags = ['Products']
            #swagger.description = 'Admin can user this endpoint for importing list of products to database instead of register for each one.'
            #swagger.consumes = ['multipart/form-data']  
            #swagger.parameters['file'] = {
                in: 'formData',
                type: 'file',
                required: 'true',
                description: 'Upload excel file data. Only excel format is allowed.',
            } 
        */
        try {
            const rows = await xlsxFile(req.file.path);
            if (!rows[0][0] || !rows[0][1] || !rows[0][2] || !rows[0][3] || !rows[0][4] || !rows[0][5] || !rows[0][6])
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: { en: "Invalid format excel file.", vn: "Tập tin excel không đúng cấu trúc." },
                });
            if (
                rows[0][0].toUpperCase() !== "BARCODE" ||
                rows[0][1].toUpperCase() !== "PRODUCT NAME" ||
                rows[0][2].toUpperCase() !== "UOM" ||
                rows[0][3].toUpperCase() !== "DEPARTMENT" ||
                rows[0][4].toUpperCase() !== "SUPPLIER CODE" ||
                rows[0][5].toUpperCase() !== "UNIT COST" ||
                rows[0][6].toUpperCase() !== "QUANTITY"
            )
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: { en: "Invalid format excel file.", vn: "Tập tin excel không đúng cấu trúc." },
                });
            rows.forEach(async (element, index) => {
                if (index > 0) {
                    let supplierQuery = await supplierModel.findOne({ supplierCode: element[4] });
                    await productModel.findOneAndUpdate(
                        { barcode: element[0].toUpperCase() },
                        {
                            barcode: element[0].toUpperCase(),
                            productName: element[1].toUpperCase(),
                            unitOfMeasure: element[2].toUpperCase(),
                            department: element[3].toUpperCase(),
                            supplierCode: element[4].toUpperCase(),
                            supplierName: supplierQuery ? supplierQuery.supplierName : "Unknown",
                            unitCost: element[5] ? element[5] : "0",
                            quantity: element[6] ? parseInt(element[6]) : 0,
                        },
                        { upsert: true, new: true, setDefaultsOnInsert: true }
                    );
                }
            });
            return res.status(200).json({
                status: true,
                statusCode: 200,
                msg: {
                    en: "All products has been import successfully!",
                    vn: "Đã nhập danh sách sản phẩm thành công!",
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
    productQuantityImport: async (req, res, next) => {
        /*
            #swagger.tags = ['Products']
            #swagger.description = 'Admin can user this endpoint for importing quantity of products to database instead of register for each one.'
            #swagger.consumes = ['multipart/form-data']  
            #swagger.parameters['file'] = {
                in: 'formData',
                type: 'file',
                required: 'true',
                description: 'Upload excel file data. Only excel format is allowed.',
            } 
        */
        try {
            const rows = await xlsxFile(req.file.path);
            if (rows[0][0].toUpperCase() !== "BARCODE" || rows[0][1].toUpperCase() !== "QUANTITY")
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: { en: "Invalid format excel file.", vn: "Tập tin excel không đúng cấu trúc." },
                });
            rows.forEach(async (element, index) => {
                if (index > 0) {
                    await productModel.findOneAndUpdate(
                        { barcode: element[0].toUpperCase() },
                        {
                            quantity: element[1] ? parseInt(element[1]) : 0,
                        }
                    );
                }
            });
            return res.status(200).json({
                status: true,
                statusCode: 200,
                msg: {
                    en: "All product quantities has been import successfully!",
                    vn: "Đã nhập danh sách số lượng sản phẩm thành công!",
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
    productRegister: async (req, res, next) => {
        // #swagger.tags = ['Products']
        // #swagger.description = 'This endpoint provides method for registering each of product.'
        try {
            const barcode = req.body.barcode ? req.body.barcode.toUpperCase() : null;
            const productName = req.body.productName ? req.body.productName.toUpperCase() : null;
            const UOM = req.body.UOM ? req.body.UOM.toUpperCase() : null;
            const department = req.body.department ? req.body.department.toUpperCase() : null;
            const supplierCode = req.body.supplierCode ? req.body.supplierCode.toUpperCase() : null;
            const unitCost = req.body.unitCost || null;
            const quantity = req.body.unitCost ? parseInt(req.body.quantity) : 0;
            const productQuery = await productModel.findOne({ barcode });
            const supplierQuery = await supplierModel.findOne({ supplierCode });
            const regex = /^([\u20AC]?[1-9]\d*\.\d{3}(?:,\d{2,9})?|[\u20AC]?[1-9]\d*(?:,\d{2,9})?|[\u20AC]?[1-9]\d*)$/;
            if (!barcode)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "Barcode is required!",
                        vn: "Mã vạch sản phẩm là bắt buộc.",
                    },
                });
            if (!productName)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "Product name is required!",
                        vn: "Tên sản phẩm là bắt buộc.",
                    },
                });
            if (!UOM)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "Unit of measure is required!",
                        vn: "Đơn vị đo lường là bắt buộc.",
                    },
                });
            if (!department)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "The department is required!",
                        vn: "Phân loại sản phẩm là bắt buộc.",
                    },
                });
            if (!supplierCode)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "The supplier code is required!",
                        vn: "Mã nhà cung cấp là bắt buộc.",
                    },
                });
            if (!unitCost || !regex.test(unitCost))
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "Price is required and must be a valid value!",
                        vn: "Giá sản phẩm là bắt buộc và phải là định dạng tiền tệ hợp lệ.",
                    },
                });
            if (!quantity)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "Quantity of product is required!",
                        vn: "Số lượng sản phẩm là bắt buộc.",
                    },
                });
            if (productQuery)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "This product barcode has been existed!",
                        vn: `Mã vạch "${barcode}" của sản phẩm "${productName}" đã tồn tại.`,
                    },
                });
            if (!supplierQuery)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: `The supplier code "${supplierCode}" is invalid, there is no data for this supplier.`,
                        vn: `Mã nhà cung "${supplierCode} không hợp lệ, không có dữ liệu về nhà cung cấp này."`,
                    },
                });
            const product = new productModel({
                barcode,
                productName,
                unitOfMeasure: UOM,
                department,
                supplierCode,
                supplierName: supplierQuery.supplierName,
                unitCost,
                quantity,
            });
            product.save();
            return res.status(200).json({
                status: true,
                statusCode: 200,
                msg: {
                    en: `The "${barcode}" has been registered successfully!`,
                    vn: `Mã vạch sản phẩm "${barcode}" đã được tạo thành công.`,
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
    productGetDetail: async (req, res, next) => {
        // #swagger.tags = ['Products']
        // #swagger.description = 'Admin can show the detail of any products by using this endpoint.'
        try {
            const barcode = req.query.barcode ? req.query.barcode.toUpperCase() : null;
            const productQuery = await productModel.findOne({ barcode });
            if (!barcode)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "Barcode is required!",
                        vn: "Mã vạch sản phẩm là bắt buộc.",
                    },
                });
            if (productQuery) {
                const supplierQuery = await supplierModel.findOne({ supplierCode: productQuery.supplierCode });
                const productRefsList = await productModel.find({ supplierCode: productQuery.supplierCode });
                return res.status(200).json({
                    status: true,
                    statusCode: 200,
                    msg: {
                        en: `Detail of product "${productQuery.productName}"`,
                        vn: `Thông tin chi tiết của sản phẩm "${productQuery.productName}"`,
                    },
                    result: {
                        data: productQuery,
                        related: {
                            supplier: supplierQuery,
                            productRefs: {
                                total: productRefsList.length,
                                data: productRefsList.length > 0 ? productRefsList : [],
                            },
                        },
                    },
                });
            } else {
                return res.status(404).json({
                    status: false,
                    statusCode: 404,
                    msg: {
                        en: `Product barcode "${barcode}" not found or has been removed, contact developer for more detail!`,
                        vn: `Không tìm thấy mã vạch sản phẩm "${barcode}", hoặc đã bị gỡ bỏ, vui lòng liên hệ quản trị viên.`,
                    },
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: false,
                statusCode: 500,
                msg: { en: "Interal Server Error" },
                error: error.message,
            });
        }
    },
    productGetAll: async (req, res, next) => {
        // #swagger.tags = ['Products']
        // #swagger.description = 'Admin can list of all products by using this endpoint.'
        try {
            const perPageMaxSize = 50;
            let perPage = parseInt(req.query.perPage) ? (parseInt(req.query.perPage) >= perPageMaxSize ? perPageMaxSize : parseInt(req.query.perPage)) : perPageMaxSize;
            let page = parseInt(req.query.page) || 1;
            productModel
                .find({})
                .sort({ quantity: 1 })
                .skip(perPage * page - perPage)
                .limit(perPage)
                .exec((err, productList) => {
                    productModel.countDocuments((err, totalProducts) => {
                        if (err) return next(err);
                        const pageTotal = Math.ceil(totalProducts / perPage);
                        if (productList.length > 0) {
                            return res.status(200).json({
                                status: true,
                                statusCode: 200,
                                msg: { en: "Get list of all products.", vn: "Danh sách tất cả sản phẩm." },
                                currentPage: page,
                                totalProducts,
                                pageTotal,
                                result: {
                                    perPage: productList.length,
                                    data: productList,
                                },
                            });
                        } else {
                            return res.status(200).json({
                                status: true,
                                statusCode: 200,
                                msg: { en: "There is no data.", vn: "Danh sách trống, không có dữ liệu nào." },
                                result: [],
                            });
                        }
                    });
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
    productGetOutOfStock: async (req, res, next) => {
        // #swagger.tags = ['Products']
        // #swagger.description = 'Admin can list of all products that is out of stock by using this endpoint.'
        try {
            const perPageMaxSize = 20;
            let perPage = parseInt(req.query.perPage) ? (parseInt(req.query.perPage) >= perPageMaxSize ? perPageMaxSize : parseInt(req.query.perPage)) : perPageMaxSize;
            let page = parseInt(req.query.page) || 1;
            productModel
                .find({ quantity: 0 })
                .sort({ updatedAt: -1 })
                .skip(perPage * page - perPage)
                .limit(perPage)
                .exec((err, productList) => {
                    productModel.countDocuments({ quantity: 0 }, (err, totalOutOfStock) => {
                        if (err) return next(err);
                        const pageTotal = Math.ceil(totalOutOfStock / perPage);
                        if (productList.length > 0) {
                            return res.status(200).json({
                                status: true,
                                statusCode: 200,
                                msg: {
                                    en: "Get list of all out of stock products.",
                                    vn: "Danh sách tất cả sản phẩm hết hàng.",
                                },
                                curentPage: page,
                                totalOutOfStock,
                                pageTotal,
                                result: {
                                    perPage: productList.length,
                                    data: productList,
                                },
                            });
                        } else {
                            return res.status(200).json({
                                status: false,
                                statusCode: 200,
                                msg: { en: "There is no data.", vn: "Danh sách trống, không có dữ liệu nào." },
                                result: [],
                            });
                        }
                    });
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
    productOutOfStockExport: async (req, res, next) => {
        // #swagger.tags = ['Products']
        // #swagger.description = 'Use this api endpoint for exporting list out of stock.'
        try {
            const requestID = req.query.requestID || 0;
            const date = Math.round(new Date().getTime() / 1000);
            const dateToCompare = Math.round(new Date().getTime() / 1000) + 60;
            console.log({ date, dateToCompare });
            if (!requestID || requestID < date) {
                return res.status(400).json({
                    status: false,
                    statusCode: 400,
                    msg: {
                        en: "Invalid request ID!",
                        vn: "Mã yêu cầu không hợp lệ.",
                    },
                    use_this_for_test: {
                        date: date.toString(),
                        dateToCompare: dateToCompare.toString(),
                    },
                });
            } else {
                const dir = path.resolve(__dirname, "../", "../", "tmp");
                const exportedFile = dir + "/tmp.xlsx";
                !fs.existsSync(dir) ? fs.mkdirSync(dir) : null;
                const worksheet = workbook.addWorksheet("Master");
                const titleStyle = workbook.createStyle({ font: { color: "#000000", size: 12, bold: true } });
                const normalStyle = workbook.createStyle({ font: { color: "#000000", size: 12 } });
                worksheet.cell(1, 1).string("Barcode").style(titleStyle);
                worksheet.cell(1, 2).string("Product name").style(titleStyle);
                worksheet.cell(1, 3).string("Supplier Code").style(titleStyle);
                worksheet.cell(1, 4).string("Supplier Name").style(titleStyle);
                worksheet.cell(1, 5).string("Quantity").style(titleStyle);
                worksheet.column(1).setWidth(30);
                worksheet.column(2).setWidth(60);
                worksheet.column(3).setWidth(30);
                worksheet.column(4).setWidth(60);
                worksheet.column(5).setWidth(20);
                await productModel.find({ quantity: 0 }).then((list) => {
                    if (list.length > 0) {
                        list.forEach((product, index) => {
                            worksheet
                                .cell(index + 2, 1)
                                .string(product.barcode)
                                .style(normalStyle);
                            worksheet
                                .cell(index + 2, 2)
                                .string(product.productName)
                                .style(normalStyle);
                            worksheet
                                .cell(index + 2, 3)
                                .string(product.supplierCode)
                                .style(normalStyle);
                            worksheet
                                .cell(index + 2, 4)
                                .string(product.supplierName)
                                .style(normalStyle);
                            worksheet
                                .cell(index + 2, 5)
                                .string(product.quantity.toString())
                                .style(normalStyle);
                        });
                    } else {
                        worksheet.cell(2, 1).string("No items").style(normalStyle);
                    }
                });
                workbook.write(exportedFile, (err, stats) => {
                    if (!err) {
                        var filename = path.basename(exportedFile);
                        var mimetype = mime.lookup(exportedFile);
                        res.setHeader("Content-disposition", "attachment; filename=" + filename);
                        res.setHeader("Content-type", mimetype);
                        var filestream = fs.createReadStream(exportedFile);
                        filestream.pipe(res);
                    } else {
                        res.end("An error occured, please refesh this page!");
                    }
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: false,
                statusCode: 500,
                msg: { en: "Interal Server Error" },
                error: error.message,
            });
        }
    },
    productDelete: async (req, res, next) => {
        // #swagger.tags = ['Products']
        // #swagger.description = 'Admin can remove any products through this endpoint.'
        try {
            const barcode = req.params.barcode ? req.params.barcode.toUpperCase() : null;
            const productQuery = await productModel.findOne({ barcode });
            if (!barcode)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "Barcode is required!",
                        vn: "Mã vạch sản phẩm là bắt buộc.",
                    },
                });
            if (!productQuery)
                return res.status(404).json({
                    status: false,
                    statusCode: 404,
                    msg: {
                        en: `Product barcode "${barcode}" not found or has been removed, contact developer for more detail!`,
                        vn: `Không tìm thấy mã vạch sản phẩm "${barcode}", hoặc đã bị gỡ bỏ, vui lòng liên hệ quản trị viên.`,
                    },
                });
            await productModel.deleteOne({ barcode });
            return res.status(200).json({
                status: true,
                statusCode: 200,
                msg: {
                    en: `Product barcode "${barcode}" has been removed successfully!`,
                    vn: `Mã vạch sản phẩm "${barcode}" đã được gỡ bỏ thành công.`,
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
    productUpdateQuantity: async (req, res, next) => {
        // #swagger.tags = ['Products']
        // #swagger.description = 'Admin can update product quantity through this endpoint.'
        try {
            const barcode = req.body.barcode ? req.body.barcode.toUpperCase() : null;
            const quantity = req.body.quantity ? parseInt(req.body.quantity) : null;
            const productQuery = await productModel.findOne({ barcode });
            if (!barcode)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "Barcode is required!",
                        vn: "Mã vạch sản phẩm là bắt buộc.",
                    },
                });
            if (quantity === null)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "Product quantity is required!",
                        vn: "Số lượng sản phẩm là bắt buộc.",
                    },
                });
            if (!productQuery)
                return res.status(404).json({
                    status: false,
                    statusCode: 404,
                    msg: {
                        en: `Product barcode "${barcode}" not found or has been removed, contact developer for more detail!`,
                        vn: `Không tìm thấy mã vạch sản phẩm "${barcode}", hoặc đã bị gỡ bỏ, vui lòng liên hệ quản trị viên.`,
                    },
                });
            await productModel.findOneAndUpdate({ barcode }, { quantity });
            return res.status(200).json({
                status: false,
                statusCode: 200,
                msg: {
                    en: `The quantity of "${barcode}" has been updated successfully!`,
                    vn: `Đã cập nhật thành công số lượng của barcode "${barcode}".`,
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
    productUpdatePrice: async function (req, res, next) {
        // #swagger.tags = ['Products']
        // #swagger.description = 'Admin can update product information through this endpoint.'
        try {
            const barcode = req.body.barcode ? req.body.barcode.toUpperCase() : null;
            const unitCost = req.body.unitCost || null;
            const productQuery = await productModel.findOne({ barcode });
            const regex = /^([\u20AC]?[1-9]\d*\.\d{3}(?:,\d{2,9})?|[\u20AC]?[1-9]\d*(?:,\d{2,9})?|[\u20AC]?[1-9]\d*)$/;

            if (!barcode)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "Barcode is required!",
                        vn: "Mã vạch sản phẩm là bắt buộc.",
                    },
                });
            if (!unitCost || !regex.test(unitCost))
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "Product price is required and must be an valid price!",
                        vn: "Giá sản phẩm là bắt buộc và phải là mệnh giá hợp lệ.",
                    },
                });
            if (!productQuery)
                return res.status(404).json({
                    status: false,
                    statusCode: 404,
                    msg: {
                        en: `Product barcode "${barcode}" not found or has been removed, contact developer for more detail!`,
                        vn: `Không tìm thấy mã vạch sản phẩm "${barcode}", hoặc đã bị gỡ bỏ, vui lòng liên hệ quản trị viên.`,
                    },
                });
            await productModel.findOneAndUpdate({ barcode }, { unitCost });
            return res.status(200).json({
                status: true,
                statusCode: 200,
                msg: {
                    en: `Price of product barcode "${barcode}" has been updated successfully!`,
                    vn: `Giá của sản phẩm có barcode "${barcode}" đã được cập nhật thành công.`,
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
};
