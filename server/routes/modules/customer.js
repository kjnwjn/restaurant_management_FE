const phoneNumberValidator = require("validate-phone-number-node-js");
const customerModel = require("../../models/customer");

module.exports = {
    customerNew: async (req, res, next) => {
        // #swagger.tags = ['Customers']
        const customerID = req.body.customerID ? req.body.customerID.toUpperCase() : null;
        const fullName = req.body.fullName ? req.body.fullName.toUpperCase() : null;
        const customerQuery = await customerModel.findOne({ customerID });
        if (!customerID || !phoneNumberValidator.validate(customerID))
            return res.status(200).json({
                status: false,
                statusCode: 200,
                msg: {
                    en: "Phone number of customer is required and must be a valid phone number.",
                    vn: "Số điện thoại khách hàng là bắt buộc và phải là số điện thoại hợp lệ.",
                },
            });
        if (!fullName)
            return res.status(200).json({
                status: false,
                statusCode: 200,
                msg: {
                    en: "Customer'name is require.",
                    vn: "Họ và tên khách hàng là bắt buộc.",
                },
            });
        if (customerQuery)
            return res.status(200).json({
                status: false,
                statusCode: 200,
                msg: {
                    en: "This phone number is already in used. Please try another phone number.",
                    vn: `Số điện thoại "${customerID}" đã được sử dụng, vui lòng sử dụng số điện thoại khác.`,
                },
            });
        console.log({ customerID, fullName });
        const newCustomer = new customerModel({ customerID, fullName });
        await newCustomer.save();
        return res.status(200).json({
            status: true,
            statusCode: 200,
            msg: {
                en: `Create an account for customer "${fullName}" successfully!`,
                vn: `Đã tạo tài khoản khách hàng thành công cho "${fullName}".`,
            },
        });
    },
    customerGetAll: async (req, res, next) => {
        // #swagger.tags = ['Customers']
        const customerQueryAll = await customerModel.find({});
        return res.status(200).json({
            status: true,
            statusCode: 200,
            msg: {
                en: "List of all customer.",
                vn: "Danh sách tất cả khách hàng",
            },
            data: customerQueryAll,
        });
    },
    customerGetDetail: async (req, res, next) => {
        // #swagger.tags = ['Customers']
        const customerID = req.params.customerID ? req.params.customerID.toUpperCase() : null;
        const customerQuery = await customerModel.findOne({ customerID }).sort({ updatedAt: -1 });
        if (customerQuery) {
            return res.status(200).json({
                status: true,
                statusCode: 200,
                msg: {
                    en: `Detail of customer ${customerQuery.fullName}.`,
                    vn: `Thông tin chi tiết của khách hàng ${customerQuery.fullName}.`,
                },
                data: customerQuery,
            });
        } else {
            return res.status(200).json({
                status: false,
                statusCode: 200,
                msg: {
                    en: `Customer ${customerID} not found.`,
                    vn: `Khách hàng ${customerID} không tồn tại.`,
                },
            });
        }
    },
};
