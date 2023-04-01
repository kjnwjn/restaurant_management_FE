const bcrypt = require("bcrypt");
const validator = require("email-validator");
const jwt = require("jsonwebtoken");
const xlsxFile = require("read-excel-file/node");
const phoneNumberValidator = require("validate-phone-number-node-js");
const accountModel = require("../../models/account");
const employeeModel = require("../../models/employee");
const adminConfig = require("../../configs/adminConfig");
const roleConfig = require("../../configs/roleConfig");
const { role } = require("../../configs/adminConfig");

module.exports = {
    accountLogin: async (req, res, next) => {
        // #swagger.tags = ['Accounts']
        // #swagger.description = 'This endpoint provides method for logging in system. Then receive an access token.'
        try {
            const userCode = req.body.userCode ? req.body.userCode.toUpperCase() : null;
            const password = req.body.password || null;
            if (!userCode)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: { en: "User account is required.", vn: "Tài khoản đăng nhập là bắt buộc." },
                });
            if (!password)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: { en: "Password is required.", vn: "Mật khẩu đăng nhập là bắt buộc." },
                });
            const accountQuery = await accountModel.findOne({ userCode });
            if (accountQuery) {
                const validPassword = bcrypt.compareSync(password, accountQuery.password);
                const lastLogin = new Date();
                if (validPassword) {
                    const jwtSignature = jwt.sign(
                        {
                            // Set the expiration upto 1 day
                            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
                            data: {
                                userCode: accountQuery.userCode,
                                fullName: accountQuery.fullName,
                                email: accountQuery.email,
                                phoneNumber: accountQuery.phoneNumber,
                                role: accountQuery.role,
                                lastLogin,
                            },
                        },
                        process.env.SECRET_KEY
                    );
                    await accountModel.findOneAndUpdate({ userCode }, { access_token: jwtSignature, lastLogin });
                    return res.status(200).json({
                        status: true,
                        statusCode: 200,
                        msg: { en: "Login successfully!", vn: "Đăng nhập thành công." },
                        token: jwtSignature,
                        payload: accountQuery,
                    });
                } else {
                    return res.status(401).json({
                        status: false,
                        statusCode: 401,
                        msg: { en: "Invalid password!", vn: "Mật khẩu không hợp lệ." },
                    });
                }
            } else {
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: { en: "Account does not exist!", vn: "Tài khoản không tồn tại." },
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
    accountImport: async (req, res, next) => {
        /*
            #swagger.tags = ['Accounts']
            #swagger.consumes = ['multipart/form-data']  
            #swagger.parameters['file'] = {
                in: 'formData',
                type: 'file',
                required: 'true',
                description: 'Upload excel file data. Only excel format is allowed.',
        } */
        // #swagger.description = 'Admin can user this endpoint for importing list of accounts to database instead of register for each one.'
        const rows = await xlsxFile(req.file.path);

        if (
            rows[0][0].toUpperCase() !== "USER CODE" ||
            rows[0][1].toUpperCase() !== "FULLNAME" ||
            rows[0][2].toUpperCase() !== "EMAIL" ||
            rows[0][3].toUpperCase() !== "PHONE NUMBER" ||
            rows[0][4].toUpperCase() !== "PASSWORD" ||
            rows[0][5].toUpperCase() !== "ROLE"
        )
            return res.status(200).json({
                status: false,
                statusCode: 200,
                msg: { en: "Invalid format excel file.", vn: "Tập tin excel không đúng cấu trúc." },
            });
        try {
            rows.forEach(async (element, index) => {
                if (index > 0) {
                    console.log(element[5].toUpperCase());
                    if (element[5].toUpperCase().includes("MANAGER")) {
                        await employeeModel.findOneAndUpdate({ userCode: element[0].toUpperCase() }, { preSalary: 40000 }, { upsert: true, new: true, setDefaultsOnInsert: true });
                    } else {
                        await employeeModel.findOneAndUpdate({ userCode: element[0].toUpperCase() }, { preSalary: 25000 }, { upsert: true, new: true, setDefaultsOnInsert: true });
                    }
                    await accountModel.findOneAndUpdate(
                        { userCode: element[0].toUpperCase() },
                        {
                            userCode: element[0].toUpperCase(),
                            fullName: element[1].toUpperCase(),
                            email: element[2].toString(),
                            phoneNumber: element[3].toString(),
                            password: bcrypt.hashSync(element[4].toString(), bcrypt.genSaltSync(10)),
                            role: element[5] ? (element[5].toUpperCase() == roleConfig.admin ? roleConfig.cashier : element[5].toUpperCase()) : null,
                        },
                        { upsert: true, new: true, setDefaultsOnInsert: true }
                    );
                }
            });
            return res.status(200).json({
                status: true,
                statusCode: 200,
                msg: {
                    en: "All accounts has been import successfully!",
                    vn: "Đã nhập danh sách tài khoản thành công!",
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
    accountRegister: async (req, res, next) => {
        // #swagger.tags = ['Accounts']
        // #swagger.description = 'This endpoint provides method for registering each of account.'
        try {
            const userCode = req.body.userCode ? req.body.userCode.toUpperCase() : null;
            const fullName = req.body.fullName ? req.body.fullName.toUpperCase() : null;
            const email = req.body.email || null;
            const phoneNumber = req.body.phoneNumber || null;
            const password = req.body.password;
            const role = req.body.role ? req.body.role.toUpperCase() : null;
            const accountQuery = await accountModel.findOne({ userCode });

            if (!userCode)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: { en: "User account is required.", vn: "Tài khoản đăng nhập là bắt buộc." },
                });
            if (!fullName)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: { en: "Fullname is required.", vn: "Họ và tên là bắt buộc." },
                });
            if (!email || !validator.validate(email))
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "Email is required and must be a valid email!",
                        vn: "Email là bắt buộc và phải là email hợp lệ.",
                    },
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
            if (!password || password.length < 6)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "Password is required and must be at least 6 characters!",
                        vn: "Mật khẩu là bắt buộc và phải từ 6 ký tự trở lên.",
                    },
                });
            if (!role)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "Role is required!",
                        vn: "Phân quyền là bắt buộc.",
                    },
                });
            if (role == "ADMIN" || role == "ADMINISTRATOR)")
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "Permission denied! Role must not be 'ADMINISTRATOR' or 'ADMIN'!",
                        vn: "Phân quyền không hợp lệ.",
                    },
                });
            if (role.includes("STAFF") || role.includes("MANAGER")) {
                if (accountQuery)
                    return res.status(200).json({
                        status: false,
                        statusCode: 200,
                        msg: {
                            en: "Account has been already existed!",
                            vn: "Tài khoản này đã tồn tại.",
                        },
                    });
                const newUser = new accountModel({
                    userCode,
                    fullName,
                    email,
                    phoneNumber,
                    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
                    role,
                });
                if (role.includes("MANAGER")) {
                    const newEmployee = new employeeModel({ userCode, preSalary: 40000 });
                    newEmployee.save();
                } else {
                    const newEmployee = new employeeModel({ userCode });
                    newEmployee.save();
                }
                newUser.save();
                return res.status(200).json({
                    status: true,
                    statusCode: 200,
                    msg: {
                        en: `Account name "${fullName}" has been registered successfully!`,
                        vn: `Tài khoản "${fullName}" đã được tạo thành công.`,
                    },
                });
            } else {
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "Permission denied! Invalid role!",
                        vn: "Phân quyền không hợp lệ.",
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
    accountDisable: async (req, res, next) => {
        // #swagger.tags = ['Accounts']
        // #swagger.description = 'Admin can disable any account through this endpoint.'
        try {
            const userCode = req.params.userCode ? req.params.userCode.toUpperCase() : null;
            const accountQuery = await accountModel.findOne({ userCode });
            const employeeQuery = await employeeModel.findOne({ userCode });
            if (!userCode)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: { en: "User account is required.", vn: "Tài khoản đăng nhập là bắt buộc." },
                });
            if (userCode == adminConfig.admin)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "Permission denied. This is ADMIN account.",
                        vn: "Bạn không có quyền hạn để xoá tài khoản này.",
                    },
                });
            if (!accountQuery || !employeeQuery)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "Account does not exist!",
                        vn: "Tài khoản này không tồn tại.",
                    },
                });
            await employeeModel.deleteOne({ userCode });
            await accountModel.deleteOne({ userCode });
            return res.status(200).json({
                status: true,
                statusCode: 200,
                msg: {
                    en: `Account name "${accountQuery.fullName}" has been disabled.`,
                    vn: `Tài khoản "${accountQuery.fullName}" đã được vô hiệu hoá.`,
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
    accountGetProfile: async (req, res, next) => {
        // #swagger.tags = ['Accounts']
        // #swagger.description = 'The server response the personal information of the current session.'
        try {
            const token = req.query.token || req.headers["x-access-token"];
            jwt.verify(token, process.env.SECRET_KEY, async (error, payload) => {
                const accountQuery = await accountModel.findOne({ userCode: payload.data.userCode });
                const employeeQuery = await employeeModel.findOne({ employeeCode: payload.data.userCode });
                return res.status(200).json({
                    status: true,
                    statusCode: 200,
                    msg: {
                        en: "Get personal information successfully!",
                        vn: "Tải thông tin cá nhân thành công!",
                    },
                    data: {
                        email: accountQuery.email,
                        fullName: accountQuery.fullName,
                        userCode: accountQuery.userCode,
                        phoneNumber: accountQuery.phoneNumber,
                        lastLogin: accountQuery.lastLogin,
                        preSalary: employeeQuery ? employeeQuery.preSalary : "Unknown",
                        role: accountQuery.role,
                        createdAt: accountQuery.createdAt,
                        updatedAt: accountQuery.updatedAt,
                    },
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
    accountGetDetail: async (req, res, next) => {
        // #swagger.tags = ['Accounts']
        try {
            const userCode = req.params.userCode ? req.params.userCode.toUpperCase() : null;
            const accountQuery = await accountModel.findOne({ userCode });
            if (!accountQuery)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: `User account "${userCode}" not found or has been remove from the system.`,
                        vn: `Tài khoản "${userCode}" không tồn tại trong hệ thống, vui lòng thử lại.`,
                    },
                });
            return res.status(200).json({
                status: true,
                statusCode: 200,
                msg: {
                    en: "Get personal information successfully!",
                    vn: "Tải thông tin cá nhân thành công!",
                },
                data: {
                    email: accountQuery.email,
                    fullName: accountQuery.fullName,
                    userCode: accountQuery.userCode,
                    phoneNumber: accountQuery.phoneNumber,
                    lastLogin: accountQuery.lastLogin,
                    role: accountQuery.role,
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
    accountUpdate: async (req, res, next) => {
        // #swagger.tags = ['Accounts']
        // #swagger.description = 'Users of the system can update their information by calling this api .'
        try {
            const userCode = req.params.userCode.toUpperCase() || null;
            const accountQuery = await accountModel.findOne({ userCode });
            if (!accountQuery)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: `User account "${userCode}" not found or has been remove from the system.`,
                        vn: `Tài khoản "${userCode}" không tồn tại trong hệ thống, vui lòng thử lại.`,
                    },
                });
            await accountModel.findOneAndUpdate(
                { userCode },
                {
                    email: req.body.email || accountQuery.email,
                    fullName: req.body.fullName ? req.body.fullName.toUpperCase() : null || accountQuery.fullName,
                    phoneNumber: req.body.phoneNumber || accountQuery.phoneNumber,
                    role: req.body.role ? (accountQuery.role == "ADMIN" ? "ADMIN" : req.body.role) : accountQuery.role,
                },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
            if (req.body.role && req.body.role.toUpperCase() == "MANAGER") {
                await employeeModel.findOneAndUpdate({ userCode }, { preSalary: 40000 });
            } else {
                await employeeModel.findOneAndUpdate({ userCode }, { preSalary: 25000 });
            }
            return res.status(200).json({
                status: true,
                statusCode: 200,
                msg: {
                    en: `Account name "${accountQuery.fullName}" has been updated successfully!`,
                    vn: `Tài khoản "${accountQuery.fullName}" đã được cập nhật thông tin thành công.`,
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
    accountChangePassword: async (req, res, next) => {
        // #swagger.tags = ['Accounts']
        // #swagger.description = 'This endpoint allows user can change their password and refresh their access token.'
        try {
            const token = req.query.token || req.headers["x-access-token"];
            const oldPassword = req.body.oldPassword || null;
            const newPassword = req.body.newPassword || null;
            const repeatPassword = req.body.repeatPassword || null;
            if (!oldPassword)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "Old password is required.",
                        vn: "Mật khẩu cũ là bắt buộc.",
                    },
                });
            if (!newPassword || newPassword.length < 6)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "New password is required and must be at least 6 characters.",
                        vn: "Mật khẩu mới không được để trống và phải ít nhất 6 ký tự.",
                    },
                });
            if (!repeatPassword || newPassword !== repeatPassword)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "Repeat password is required and must be matched new password.",
                        vn: "Mật khẩu xác nhận không được để trống và phải khớp với mật khẩu mới.",
                    },
                });
            jwt.verify(token, process.env.SECRET_KEY, async (error, payload) => {
                const accountQuery = await accountModel.findOne({ userCode: payload.data.userCode });
                if (!bcrypt.compareSync(oldPassword, accountQuery.password))
                    return res.status(401).json({
                        status: false,
                        statusCode: 401,
                        msg: {
                            en: "Old password is incorrect.",
                            vn: "Mật khẩu cũ không đúng.",
                        },
                    });
                const jwtSignature = jwt.sign(
                    {
                        // Set the expiration upto 1 day
                        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
                        data: {
                            userCode: accountQuery.userCode,
                            fullName: accountQuery.fullName,
                            email: accountQuery.email,
                            phoneNumber: accountQuery.phoneNumber,
                            role: accountQuery.role,
                            lastLogin: new Date(),
                        },
                    },
                    process.env.SECRET_KEY
                );
                await accountModel.findOneAndUpdate(
                    { userCode: payload.data.userCode },
                    {
                        password: bcrypt.hashSync(repeatPassword, bcrypt.genSaltSync(10)),
                        access_token: jwtSignature,
                    },
                    { upsert: true, new: true, setDefaultsOnInsert: true }
                );
                return res.status(200).json({
                    status: true,
                    statusCode: 200,
                    msg: {
                        en: `Password of "${accountQuery.fullName}" has been updated successfully!`,
                        vn: `Mật khẩu tài khoản "${accountQuery.fullName}" đã được cập nhật thành công.`,
                    },
                    token: jwtSignature,
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
    accountGetAll: async (req, res, next) => {
        // #swagger.tags = ['Accounts']
        // #swagger.description = 'Admin can list of all accounts by using this endpoint.'
        try {
            const accountList = await accountModel.find({}).sort({ updatedAt: -1 });
            if (accountList.length > 0) {
                return res.status(200).json({
                    status: true,
                    statusCode: 200,
                    msg: { en: "Get list of all accounts.", vn: "Danh sách tất cả tài khoản." },
                    result: {
                        total: accountList.length,
                        data: accountList,
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
