const jwt = require("jsonwebtoken");
const transactionModel = require("../models/transaction");
const role = require("../configs/roleConfig");
const authorization = {
    admin: async (req, res, next) => {
        try {
            const token = req.query.token || req.headers["x-access-token"] || null;
            jwt.verify(token, process.env.SECRET_KEY, async (error, payload) => {
                if (payload.data && payload.data.role.toUpperCase() == role.admin) {
                    return next();
                } else {
                    return res.status(401).json({
                        status: false,
                        msg: {
                            en: "Permission denied! Only admin is allowed to access this enpoint!",
                            vn: "Bạn không có quyền truy cập. Vui lòng liên hệ quản trị viên!",
                        },
                    });
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
    manager: async (req, res, next) => {
        try {
            const token = req.query.token || req.headers["x-access-token"] || null;
            jwt.verify(token, process.env.SECRET_KEY, async (error, payload) => {
                if (payload.data.role.toUpperCase() == role.admin || payload.data.role.toUpperCase() == role.manager) {
                    return next();
                } else {
                    return res.status(401).json({
                        status: false,
                        msg: {
                            en: "Permission denied! Only admin is allowed to access this enpoint!",
                            vn: "Bạn không có quyền truy cập. Vui lòng liên hệ quản trị viên!",
                        },
                    });
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
    checkPayStatus: async (req, res, next) => {
        const transactionID = req.params.transactionID || null;
        const transactionQuery = await transactionModel.findOne({ transactionID });
        if (!transactionQuery)
            return res.status(404).json({
                status: false,
                statusCode: 404,
                msg: {
                    en: `This transaction not found. Please create a new transaction!`,
                    vn: `Giao dịch này không tồn tại, vui lòng thực hiện lại.`,
                },
            });
        if (transactionQuery.payStatus)
            return res.status(404).json({
                status: false,
                statusCode: 404,
                msg: {
                    en: "Permission denied, this transaction has been paid.",
                    vn: "Bạn không được phép thực hiện. Giao dịch này đã được thanh toán.",
                },
            });
        return next();
    },
};

module.exports = authorization;
