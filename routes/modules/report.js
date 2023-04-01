const bcrypt = require("bcrypt");
const validator = require("email-validator");
const jwt = require("jsonwebtoken");
const xlsxFile = require("read-excel-file/node");
const phoneNumberValidator = require("validate-phone-number-node-js");
const accountModel = require("../../models/account");
const adminConfig = require("../../configs/adminConfig");
const transactionModel = require("../../models/transaction");

module.exports = {
    reportGetAllTransaction: async (req, res, next) => {
        // #swagger.tags = ['Report']
        try {
            const perPageMaxSize = 50;
            let perPage = parseInt(req.query.perPage)
                ? parseInt(req.query.perPage) >= perPageMaxSize
                    ? perPageMaxSize
                    : parseInt(req.query.perPage)
                : perPageMaxSize;
            let page = parseInt(req.query.page) || 1;
            transactionModel
                .find({ payStatus: true })
                .skip(perPage * page - perPage)
                .limit(perPage)
                .exec((err, transactionList) => {
                    transactionModel.countDocuments((err, totalTransactions) => {
                        if (err) return next(err);
                        const pageTotal = Math.ceil(totalTransactions / perPage);
                        if (transactionList.length > 0) {
                            return res.status(200).json({
                                status: true,
                                statusCode: 200,
                                msg: { en: "Get list of all transactions.", vn: "Danh sách tất cả các giao dịch đã thanh toán." },
                                curentPage: page,
                                totalTransactions,
                                pageTotal,
                                result: {
                                    perPage: transactionList.length,
                                    data: transactionList,
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
   
};
