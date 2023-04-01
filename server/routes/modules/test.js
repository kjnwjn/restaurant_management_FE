const bcrypt = require("bcrypt");
const validator = require("email-validator");
const jwt = require("jsonwebtoken");
const xlsxFile = require("read-excel-file/node");
const phoneNumberValidator = require("validate-phone-number-node-js");
const accountModel = require("../../models/account");
const adminConfig = require("../../configs/adminConfig");
const transactionModel = require("../../models/transaction");

module.exports = {
    test: async (req, res, next) => {
        // #swagger.tags = ['Test']
        let myArray = [
            {
                dateString: "11/10/2022",
                userCode: "CK-PT9115",
                totalWorkTime: 4,
            },
            {
                dateString: "11/10/2022",
                userCode: "CK-HCM0320756",
                totalWorkTime: 4,
            },
            {
                dateString: "11/10/2022",
                userCode: "CK-PT9567",
                totalWorkTime: 5,
            },
            {
                dateString: "9/11/2022",
                userCode: "CK-PT9115",
                totalWorkTime: 4,
            },
            {
                dateString: "9/11/2022",
                userCode: "CK-HCM0320756",
                totalWorkTime: 8,
            },
        ];

        const arr2 = [
            {
                dateString: "11/10/2022",
                data: [
                    {
                        userCode: "CK-PT9115",
                        totalWorkTime: 4,
                    },
                    {
                        userCode: "CK-HCM0320756",
                        totalWorkTime: 4,
                    },
                    {
                        userCode: "CK-PT9567",
                        totalWorkTime: 5,
                    },
                ],
            },
            {
                dateString: "9/11/2022",
                data: [
                    {
                        userCode: "CK-PT9115",
                        totalWorkTime: 4,
                    },
                ],
            },
        ];

        const dateStringValue = myArray.reduce((result, currentObject) => {
            if (!result.includes(currentObject.dateString)) result.push(currentObject.dateString);
            return result;
        }, []);

        const myArray2 = dateStringValue.map((element) => {
            return { dateString: element, data: myArray.filter((e) => e.dateString == element) };
        });

        console.log(myArray2);

        next();
    },
    end: async (req, res, next) => {
        // #swagger.tags = ['Test']
        res.end("Finish test");
    },
};
