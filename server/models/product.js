const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const productSchema = new mongoose.Schema(
    {
        barcode: {
            type: String,
            required: true,
            unique: true,
        },
        productName: {
            type: String,
            required: true,
        },
        unitOfMeasure: {
            type: String,
            default: "Unknown",
        },
        department: {
            type: String,
            default: "Unknown",
        },
        supplierCode: {
            type: String,
            required: true,
        },
        supplierName: {
            type: String,
            required: true,
        },
        unitCost: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

productSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all",
});

module.exports = mongoose.model("Product", productSchema);
