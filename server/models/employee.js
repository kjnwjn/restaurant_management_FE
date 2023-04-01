const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const employeeSchema = new mongoose.Schema(
    {
        userCode: {
            type: String,
            require: true,
        },
        preSalary: {
            type: Number,
            default: 25000,
        },
        salaryMonth: {
            type: Date,
            default: null,
        },
        totalWorkTime: {
            type: Number,
            default: 0,
        },
        finalSalary: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

employeeSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all",
});

module.exports = mongoose.model("Employee", employeeSchema);
