const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const attendanceSchema = new mongoose.Schema(
    {
        userCode: {
            type: String,
            require: true,
        },
        checkIn: {
            type: Date,
            default: new Date(),
        },
        checkOut: {
            type: Date,
            default: null,
        },
        totalWorkTime: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

attendanceSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all",
});

module.exports = mongoose.model("Attendance", attendanceSchema);
