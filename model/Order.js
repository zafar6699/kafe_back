const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema({
    order: { type: Number, trim: true, min: 0, required: true },
    waiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Waiter",
        required: true,
    },
    table: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Table",
        required: true,
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        title: { type: String, required: true },
        price: { type: Number, required: true },
        count: { type: Number, required: true },
    }, ],
    salePrice: {
        type: Number,
        default: 0,
    },
    status: { type: Number, enum: [1, 2, 3, 4], default: 1 },
    payType: { type: Number, enum: [1, 2, 3, 4] },
}, { timestamps: true });
module.exports = mongoose.model("Order", OrderSchema);