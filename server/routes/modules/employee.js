const xlsxFile = require("read-excel-file/node");
const checkInOutModel = require("../../models/attendance");
const employeeModel = require("../../models/employee");
const accountModel = require("../../models/account");
const attendanceModel = require("../../models/attendance");
const phoneNumberValidator = require("validate-phone-number-node-js");
const fs = require("fs");
const path = require("path");
const mime = require("mime");
const excel = require("excel4node");
const workbook = new excel.Workbook();

module.exports = {
    employeeUpdateSalary: async (req, res, next) => {
        // #swagger.tags = ['Employee']
        try {
            const userCode = req.body.userCode ? req.body.userCode.toUpperCase() : null;
            const newSalary = parseInt(req.body.newSalary) ? parseInt(req.body.newSalary) : null;
            if (!userCode) {
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: { en: "userCode is required.", vn: "Mã số nhân viên là bắt buộc." },
                });
            }
            if (!newSalary) {
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: { en: "New Salary is required.", vn: "Mức lương mới của nhân viên là bắt buộc." },
                });
            }
            const employeeQuery = await employeeModel.findOne({ userCode });
            const accountQuery = await accountModel.findOne({ userCode });
            if (!employeeQuery) {
                return res.status(200).json({
                    status: false,
                    statusCode: 200,
                    msg: { en: "Employee does not exist.", vn: "Nhân viên không tồn tại." },
                });
            }
            await employeeModel.findOneAndUpdate(
                { userCode },
                {
                    preSalary: newSalary,
                }
            );
            return res.status(200).json({
                status: true,
                statusCode: 200,
                msg: {
                    en: `Employee's salary has been updated successfully!`,
                    vn: `Lương của nhân viên ${accountQuery.fullName} đã được cập nhật thông tin thành công.`,
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
    employeeSalaryVisualize: async (req, res, next) => {
        // #swagger.tags = ['Employee']
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
            const attendanceQueryAll = await attendanceModel.find({});
            const employeeQueryAll = await employeeModel.find({});
            const accountQueryAll = await accountModel.find({});
            const userCodeArray = attendanceQueryAll
                .reduce((result, currentObject, currentIndex) => {
                    if (!result.includes(currentObject.userCode)) result.push(currentObject.userCode);
                    return result;
                }, [])
                .map((element) => {
                    return {
                        userCode: element,
                        preSalary: employeeQueryAll.find((e) => e.userCode == element).preSalary,
                        fullName: accountQueryAll.find((e) => e.userCode == element).fullName,
                    };
                });

            let totalSalary = 0;
            const finalData = userCodeArray.map((element) => {
                let data = attendanceQueryAll.filter((e) => timeFrom <= e.checkIn && e.checkIn <= timeTo && e.userCode === element.userCode);
                let finalWorkTime = data.reduce((result, currentObject, currentIndex) => {
                    return (result += currentObject.totalWorkTime);
                }, 0);
                totalSalary += element.preSalary * finalWorkTime;
                return {
                    userCode: element.userCode,
                    fullName: element.fullName,
                    finalWorkTime,
                    preSalary: element.preSalary,
                    tempSalary: element.preSalary * finalWorkTime,
                    data,
                };
            });
            // Code here=================================================================
            return res.status(200).json({
                status: true,
                statusCode: 200,
                msg: {
                    en: "",
                    vn: "",
                },
                timeData: {
                    startDate: timeFrom,
                    endDate: timeTo,
                },
                result: finalData,
                totalSalary,
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
    employeeSalaryVisualizeExport: async (req, res, next) => {
        // #swagger.tags = ['Employee']
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
            const attendanceQueryAll = await attendanceModel.find({});
            const employeeQueryAll = await employeeModel.find({});
            const accountQueryAll = await accountModel.find({});
            const userCodeArray = attendanceQueryAll
                .reduce((result, currentObject, currentIndex) => {
                    if (!result.includes(currentObject.userCode)) result.push(currentObject.userCode);
                    return result;
                }, [])
                .map((element) => {
                    return {
                        userCode: element,
                        preSalary: employeeQueryAll.find((e) => e.userCode == element).preSalary,
                        fullName: accountQueryAll.find((e) => e.userCode == element).fullName,
                    };
                });

            const finalData = userCodeArray.map((element) => {
                let data = attendanceQueryAll.filter((e) => timeFrom <= e.checkIn && e.checkIn <= timeTo && e.userCode === element.userCode);
                let finalWorkTime = data.reduce((result, currentObject, currentIndex) => {
                    return (result += currentObject.totalWorkTime);
                }, 0);
                return {
                    userCode: element.userCode,
                    fullName: element.fullName,
                    finalWorkTime,
                    preSalary: element.preSalary,
                    tempSalary: element.preSalary * finalWorkTime,
                    data,
                };
            });
            const dir = path.resolve(__dirname, "../", "../", "tmp");
            const exportedFile = dir + "/tmp.xlsx";
            !fs.existsSync(dir) ? fs.mkdirSync(dir) : null;
            const worksheet = workbook.addWorksheet("Master");
            const titleStyle = workbook.createStyle({ font: { color: "#000000", size: 12, bold: true } });
            const normalStyle = workbook.createStyle({ font: { color: "#000000", size: 12 } });
            worksheet.cell(1, 1).string("User code").style(titleStyle);
            worksheet.cell(1, 2).string("Full name").style(titleStyle);
            worksheet.cell(1, 3).string("Basic salary").style(titleStyle);
            worksheet.cell(1, 4).string("Work time").style(titleStyle);
            worksheet.cell(1, 5).string("Total salary").style(titleStyle);
            worksheet.column(1).setWidth(20);
            worksheet.column(2).setWidth(35);
            worksheet.column(3).setWidth(20);
            worksheet.column(4).setWidth(20);
            worksheet.column(5).setWidth(20);
            if (finalData && finalData.length > 0) {
                finalData.forEach((employee, index) => {
                    worksheet
                        .cell(index + 2, 1)
                        .string(employee.userCode)
                        .style(normalStyle);

                    worksheet
                        .cell(index + 2, 2)
                        .string(employee.fullName)
                        .style(normalStyle);
                    worksheet
                        .cell(index + 2, 3)
                        .string(employee.preSalary.toString())
                        .style(normalStyle);
                    worksheet
                        .cell(index + 2, 4)
                        .string(employee.finalWorkTime.toString())
                        .style(normalStyle);
                    worksheet
                        .cell(index + 2, 5)
                        .string(employee.tempSalary.toString())
                        .style(normalStyle);
                });
            } else {
                worksheet.cell(2, 1).string("No data").style(normalStyle);
            }
            // Code here=================================================================
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
    employeeGetAll: async (req, res, next) => {
        // #swagger.tags = ['Employee']
        let dataArray = [];
        const employeeQueryAll = await employeeModel.find({});
        const accountQueryAll = await accountModel.find({});
        employeeQueryAll.forEach((employee) => {
            let account = accountQueryAll.find((account) => account.userCode == employee.userCode);
            if (account) {
                dataArray.push({
                    userCode: account.userCode,
                    fullName: account.fullName,
                    preSalary: employee.preSalary,
                    role: account.role,
                    updatedAt: account.updatedAt,
                });
            }
        });
        return res.status(200).json({
            status: true,
            statusCode: 200,
            result: dataArray,
        });
    },
    employeeGetDetail: async (req, res, next) => {
        // #swagger.tags = ['Employee']
        const userCode = req.params.userCode.toUpperCase();
        const accountQuery = await accountModel.findOne({ userCode });
        const employeeQuery = await employeeModel.findOne({ userCode });
        return res.status(200).json({
            status: true,
            statusCode: 200,
            result:
                accountQuery && employeeQuery
                    ? {
                          userCode: accountQuery.userCode,
                          fullName: accountQuery.fullName,
                          preSalary: employeeQuery.preSalary,
                          role: accountQuery.role,
                          updatedAt: accountQuery.updatedAt,
                      }
                    : null,
        });
    },
};
