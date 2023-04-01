const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const supplierSchema = new mongoose.Schema(
    {
        supplierCode: {
            type: String,
            require: true,
            unique: true,
        },
        supplierName: {
            type: String,
            require: true,
        },
        address: {
            type: String,
            default: "Unknown",
        },
        phoneNumer: {
            type: String,
            default: "Unknown",
        },
    },
    {
        timestamps: true,
    }
);

supplierSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all",
});

module.exports = mongoose.model("Supplier", supplierSchema);
