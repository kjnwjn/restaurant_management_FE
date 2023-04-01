const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const customerSchema = new mongoose.Schema(
    {
        customerID: {
            type: String,
            require: true,
        },
        fullName: {
            type: String,
            require: true,
        },
        point: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

customerSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all",
});

module.exports = mongoose.model("Customer", customerSchema);
