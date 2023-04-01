const attendanceModel = require("../../models/attendance");
const accountModel = require("../../models/account");

module.exports = {
    attendanceCheckIn: async (req, res, next) => {
        // #swagger.tags = ['Attendance']
        try {
            const userCode = req.body.userCode ? req.body.userCode.toUpperCase() : null;
            const checkIn = new Date();
            const accountQuery = await accountModel.findOne({ userCode });
            if (!userCode)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "User account is required.",
                        vn: "Tài khoản đăng nhập là bắt buộc.",
                    },
                });
            if (accountQuery && accountQuery.role == "ADMIN") {
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "ADMIN cannot complete this request.",
                        vn: "Tài khoản ADMIN không thể thực hiện yêu cầu này.",
                    },
                });
            }
            if (accountQuery) {
                const noCheckOut = await attendanceModel.findOne({ userCode, checkOut: null });
                if (noCheckOut)
                    return res.status(200).json({
                        status: false,
                        statusCode: 200,
                        msg: {
                            en: `"${accountQuery.fullName}" need to fish a previous shift!`,
                            vn: `"${accountQuery.fullName}" cần kết thúc một ca làm trước đó.`,
                        },
                    });
                const employee = new attendanceModel({ userCode, checkIn });
                employee.save();
                return res.status(200).json({
                    status: true,
                    statusCode: 200,
                    msg: { en: `"${accountQuery.fullName}" check in successfully!`, vn: `"${accountQuery.fullName}" check-in thành công.` },
                });
            } else {
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "Account does not exist!",
                        vn: "Tài khoản không tồn tại.",
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
    attendanceCheckOut: async (req, res, next) => {
        // #swagger.tags = ['Attendance']
        try {
            const today = new Date();
            const userCode = req.body.userCode ? req.body.userCode.toUpperCase() : null;
            const accountQuery = await accountModel.findOne({ userCode });
            const attendanceQuery = await attendanceModel.findOne({ userCode, checkOut: null });
            if (!userCode)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "User account is required.",
                        vn: "Mã số nhân viên là bắt buộc.",
                    },
                });
            if (!accountQuery)
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "Account does not exist!",
                        vn: "Tài khoản không tồn tại.",
                    },
                });
            if (accountQuery && accountQuery.role == "ADMIN") {
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "ADMIN cannot complete this request.",
                        vn: "Tài khoản ADMIN không thể thực hiện yêu cầu này.",
                    },
                });
            }
            if (!attendanceQuery || attendanceQuery.checkIn.getDay() != today.getDay())
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: `${accountQuery.fullName} does not have any shift today.`,
                        vn: `${accountQuery.fullName} không có ca làm việc nào hôm nay.`,
                    },
                });
            let totalWorkTime = today.getHours() * 60 + today.getMinutes() - (attendanceQuery.checkIn.getHours() * 60 + attendanceQuery.checkIn.getMinutes());
            const hour = Math.floor(totalWorkTime / 60);
            const minute = totalWorkTime % 60;
            totalWorkTime = minute > 50 ? hour + 1 : hour;
            await attendanceModel.findOneAndUpdate({ userCode: attendanceQuery.userCode, checkIn: attendanceQuery.checkIn }, { checkOut: today, totalWorkTime });
            return res.status(200).json({
                status: true,
                statusCode: 200,
                msg: { en: `"${accountQuery.fullName}" check out successfully!`, vn: `"${accountQuery.fullName}" check-out thành công.` },
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
    attendanceGetAll: async (req, res, next) => {
        // #swagger.tags = ['Attendance']
        try {
            let data = [];
            const filter = req.query.filter || "all";
            const from = req.query.from || "";
            const to = req.query.to || "";
            const employeeQuery = await attendanceModel.find({});
            if (employeeQuery.length <= 0)
                return res.status(200).json({
                    status: true,
                    statusCode: 200,
                    msg: { en: "There is no data.", vn: "Danh sách trống, không có dữ liệu nào." },
                    result: [],
                });

            switch (filter) {
                case "all":
                    data = employeeQuery;
                case "day":
                    if (from && to) {
                        if (from.includes("/") && to.includes("/") && from.split("/").length === 3 && to.split("/").length === 3) {
                            const dayFrom = parseInt(from.split("/")[0]) || "";
                            const monthFrom = parseInt(from.split("/")[1]) || "";
                            const YearFrom = parseInt(from.split("/")[2]) || "";

                            const dayTo = parseInt(to.split("/")[0]) || "";
                            const monthTo = parseInt(to.split("/")[1]) || "";
                            const YearTo = parseInt(to.split("/")[2]) || "";
                            if (dayFrom && monthFrom && YearFrom && dayTo && monthTo && YearTo) {
                                employeeQuery.forEach((employee) => {
                                    let dateQuery = employee.checkIn.toISOString().slice(0, 10);
                                    const dayQuery = parseInt(dateQuery.split("-")[2]);
                                    const monthQuery = parseInt(dateQuery.split("-")[1]);
                                    const yearQuery = parseInt(dateQuery.split("-")[0]);
                                    if (yearQuery >= parseInt(YearFrom) && yearQuery <= parseInt(YearTo)) {
                                        if (monthQuery >= parseInt(monthFrom) && monthQuery <= parseInt(monthTo)) {
                                            if (dayQuery >= parseInt(dayFrom) && dayQuery <= parseInt(dayTo)) {
                                                data.push(employee);
                                            }
                                        }
                                    }
                                });
                            } else {
                                return res.status(200).json({
                                    status: false,
                                    statusCode: 200,
                                    msg: {
                                        en: "Please enter time format : dd/mm/year",
                                        vn: "Nhập dữ liệu thời gian với format như sau: dd/mm/year",
                                    },
                                });
                            }
                        } else {
                            return res.status(200).json({
                                status: false,
                                statusCode: 200,
                                msg: {
                                    en: "Please enter time format : dd/mm/year",
                                    vn: "Nhập dữ liệu thời gian với format như sau: dd/mm/year",
                                },
                            });
                        }
                    } else {
                        return res.status(200).json({
                            status: false,
                            statusCode: 200,
                            msg: {
                                en: "Field date from,to are require!",
                                vn: "Vui lòng chọn thời gian bắt đầu và kết thúc",
                            },
                        });
                    }

                default:
            }
            return res.status(200).json({
                status: true,
                statusCode: 200,
                msg: {
                    en: "Get list check in-out employee successfully!",
                    vn: "Lấy danh sách check in-out nhân viên thành công",
                },
                data: data,
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
    attendanceReport: async (req, res, next) => {
        // #swagger.tags = ['Attendance']
        let finalData = [];
        const attendanceList = await attendanceModel.find({}).sort({ updatedAt: -1 });
        const dateFrom = req.query.dateFrom || "";
        const dateTo = req.query.dateTo || "";
        let timeTo = new Date();
        // Date format: DD-MM-YYYY
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
        if (dateTo) {
            if (!validDateTo) {
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: {
                        en: "The end date must be a valid date: DD/MM/YYYY",
                        vn: "Thời điểm kết thúc và phải là dữ liệu hợp lệ: DD/MM/YYYY",
                    },
                });
            }
            const dayTo = parseInt(dateTo.split("/")[0]);
            const monthTo = parseInt(dateTo.split("/")[1]) - 1;
            const yearTo = parseInt(dateTo.split("/")[2]);
            timeTo = new Date(yearTo, monthTo, dayTo, 23, 59, 59);
        }

        const dayFrom = parseInt(dateFrom.split("/")[0]);
        const monthFrom = parseInt(dateFrom.split("/")[1]) - 1;
        const yearFrom = parseInt(dateFrom.split("/")[2]);
        const timeFrom = new Date(yearFrom, monthFrom, dayFrom, 0, 0, 0);

        console.log({ timeFrom, timeTo });

        if (timeTo < timeFrom)
            return res.status(200).json({
                status: false,
                statusCode: 200,
                msg: {
                    en: "The start date must be lager than the end date.",
                    vn: "Thời điểm kết thúc phải lớn hơn thời điểm bắt đầu.",
                },
            });
        if (attendanceList.length <= 0)
            return res.status(200).json({
                status: true,
                statusCode: 200,
                msg: { en: "There is no data.", vn: "Danh sách trống, không có dữ liệu nào." },
                result: [],
            });
        attendanceList.forEach((ele) => {
            let checkIn = new Date(ele.checkIn.toISOString());
            let dateString = `${checkIn.getDate()}/${checkIn.getMonth() + 1}/${checkIn.getFullYear()}`;
            if (checkIn >= timeFrom && checkIn <= timeTo) {
                finalData.push({
                    dateString,
                    userCode: ele.userCode,
                    timeIn: ele.checkIn,
                    timeOut: ele.checkOut,
                    totalWorkTime: ele.totalWorkTime,
                });
            }
        });
        const dateStringValue = finalData.reduce((result, currentObject, currentIndex) => {
            if (!result.includes(currentObject.dateString)) result.push(currentObject.dateString);
            return result;
        }, []);
        return res.status(200).json({
            status: true,
            statusCode: 200,
            msg: { en: "", vn: "" },
            result: dateStringValue.map((element) => {
                return { dateString: element, data: finalData.filter((e) => e.dateString == element) };
            }),
        });
    },
};
