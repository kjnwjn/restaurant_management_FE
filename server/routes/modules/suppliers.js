const xlsxFile = require("read-excel-file/node");

const productModel = require("../../models/product");
const supplierModel = require("../../models/supplier");
const phoneNumberValidator = require("validate-phone-number-node-js");

module.exports = {
    supplierImport: async (req, res, next) => {
        /*
            #swagger.tags = ['Suppliers']
            #swagger.description = 'Admin can user this endpoint for importing list of suppliers to database instead of register for each one.'
            #swagger.consumes = ['multipart/form-data']  
            #swagger.parameters['file'] = {
                in: 'formData',
                type: 'file',
                required: 'true',
                description: 'Upload excel file data. Only excel format is allowed.',
        } */
        try {
            const rows = await xlsxFile(req.file.path);
            if (
                rows[0][0].toUpperCase() !== "SUPPLIER CODE" ||
                rows[0][1].toUpperCase() !== "SUPPLIER NAME" ||
                rows[0][2].toUpperCase() !== "ADDRESS" ||
                rows[0][3].toUpperCase() !== "PHONE NUMBER"
            )
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: { en: "Invalid format excel file.", vn: "Tập tin excel không đúng cấu trúc." },
                });
            rows.forEach(async (element, index) => {
                if (index > 0) {
                    await supplierModel.findOneAndUpdate(
                        { supplierCode: element[0].toUpperCase() },
                        {
                            supplierCode: element[0].toUpperCase(),
                            supplierName: element[1].toUpperCase(),
                            address: element[2],
                            phoneNumber: element[3],
                        },
                        {
                            upsert: true,
                            new: true,
                            setDefaultsOnInsert: true,
                        }
                    );
                }
            });
            return res.status(200).json({
                status: true,
                statusCode: 200,
                msg: {
                    en: "All suppliers has been import successfully!",
                    vn: "Đã nhập danh sách nhà cung cấp thành công!",
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
    supplierRegister: async (req, res, next) => {
        // #swagger.tags = ['Suppliers']
        // #swagger.description = 'This endpoint provides method for registering each of supplier.'
        try {
            const supplierCode = req.body.supplierCode || null;
            const supplierName = req.body.supplierName || null;
            const address = req.body.address || null;
            const phoneNumber = req.body.phoneNumber || null;
            const supplierQuery = await supplierModel.findOne({ supplierCode });
            if (!supplierCode)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: { en: "Supplier code is required!", vn: "Mã nhà cung cấp là bắt buộc." },
                });
            if (!supplierName)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: { en: "Supplier name is required!", vn: "Tên nhà cung cấp là bắt buộc." },
                });
            if (!address)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: { en: "Address is required!", vn: "Địa chỉ là bắt buộc." },
                });
            if (!phoneNumber || !phoneNumberValidator.validate(phoneNumber))
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "Phone number is required and must be a valid phone number!",
                        vn: "Số điện thoại là bắt buộc và phải là số điện thoại hợp lệ.",
                    },
                });
            if (supplierQuery)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: `Supplier code "${supplierCode}" has been already existed!`,
                        vn: `Mã nhà cung cấp "${supplierCode}" đã tồn tại.`,
                    },
                });
            const supplier = new supplierModel({
                supplierCode: supplierCode.toUpperCase(),
                supplierName: supplierName.toUpperCase(),
                address,
                phoneNumber,
            });
            supplier.save();
            return res.status(200).json({
                status: true,
                statusCode: 200,
                msg: {
                    en: `Supplier code "${supplierCode}" has been registered successfully!`,
                    vn: `Mã nhà cung cấp "${supplierCode}" đã được tạo thành công.`,
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
    supplierGetAll: async (req, res, next) => {
        // #swagger.tags = ['Suppliers']
        // #swagger.description = 'Admin can list of all suppliers by using this endpoint.'
        try {
            const perPageMaxSize = 20;
            let perPage = parseInt(req.query.perPage) ? (parseInt(req.query.perPage) >= perPageMaxSize ? perPageMaxSize : parseInt(req.query.perPage)) : perPageMaxSize;
            let page = parseInt(req.query.page) || 1;
            supplierModel
                .find({})
                .sort({ updatedAt: -1 })
                .skip(perPage * page - perPage)
                .limit(perPage)
                .exec((err, supplierList) => {
                    supplierModel.countDocuments(async (err, totalSuppliers) => {
                        if (err) return next(err);
                        const pageTotal = Math.ceil(totalSuppliers / perPage);
                        if (supplierList.length > 0) {
                            const resultData = await Promise.all(
                                supplierList.map(async (element) => {
                                    const productRefs = await productModel.find({
                                        supplierCode: element.supplierCode,
                                    });
                                    return {
                                        supplier: element,
                                        productRefs: {
                                            total: productRefs.length,
                                            data: productRefs.length > 0 ? productRefs : [],
                                        },
                                    };
                                })
                            );
                            return res.status(200).json({
                                status: true,
                                statusCode: 200,
                                msg: { en: "Get list of all suppliers.", vn: "Danh sách tất cả nhà cung cấp." },
                                currentPage: page,
                                totalSuppliers,
                                pageTotal,
                                result: {
                                    perPage: supplierList.length,
                                    data: resultData,
                                },
                            });
                        } else {
                            return res.status(200).json({
                                status: false,
                                statusCode: 200,
                                msg: { en: "There is no data.", vn: "Danh sách trống, không có dữ liệu nào." },
                                result: {
                                    perPage: 0,
                                    data: [],
                                },
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
    supplierGetDetail: async (req, res, next) => {
        // #swagger.tags = ['Suppliers']
        // #swagger.description = 'Admin can show the detail of any suppliers by using this endpoint.'
        try {
            const supplierCode = req.query.supplierCode ? req.query.supplierCode.toUpperCase() : null;
            const supplierQuery = await supplierModel.findOne({ supplierCode });
            const productRefsList = await productModel.find({ supplierCode });
            if (!supplierCode)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: { en: "Supplier code is required!", vn: "Mã nhà cung cấp là bắt buộc." },
                });
            if (supplierQuery) {
                return res.status(200).json({
                    status: true,
                    statusCode: 200,
                    msg: {
                        en: `Detail of supplier "${supplierQuery.supplierName}".`,
                        vn: `Thông tin chi tiết của nhà cung cấp "${supplierQuery.supplierName}".`,
                    },
                    result: {
                        supplier: supplierQuery,
                        productRefs: {
                            total: productRefsList.length,
                            data: productRefsList.length > 0 ? productRefsList : [],
                        },
                    },
                });
            } else {
                return res.status(404).json({
                    status: false,
                    statusCode: 404,
                    msg: {
                        en: `Supplier code "${supplierCode}" not found or has been removed, contact developer for more detail!`,
                        vn: `Không tìm thấy mã nhà cung cấp "${supplierCode}" hoặc đã bị gỡ bỏ, vui lòng liên hệ quản trị viên.`,
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
    supplierDelete: async (req, res, next) => {
        // #swagger.tags = ['Suppliers']
        // #swagger.description = 'Admin can disable any suppliers through this endpoint.'
        try {
            const supplierCode = req.params.supplierCode ? req.params.supplierCode.toUpperCase() : null;
            const supplierQuery = await supplierModel.findOne({ supplierCode });
            if (!supplierCode)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: { en: "Supplier code is required!", vn: "Mã nhà cung cấp là bắt buộc." },
                });
            if (!supplierQuery)
                return res.status(404).json({
                    status: false,
                    statusCode: 404,
                    msg: {
                        en: `Supplier code "${supplierCode}" not found or has been removed, contact developer for more detail!`,
                        vn: `Không tìm thấy mã nhà cung cấp "${supplierCode}" hoặc đã bị gỡ bỏ, vui lòng liên hệ quản trị viên.`,
                    },
                });
            await supplierModel.remove({ supplierCode });
            await productModel.deleteMany({ supplierCode });
            return res.status(200).json({
                status: true,
                statusCode: 200,
                msg: {
                    en: `Supplier code "${supplierCode}" has been removed successfully!`,
                    vn: `Mã nhà cung cấp "${supplierCode}" đã được gỡ bỏ thành công.`,
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
