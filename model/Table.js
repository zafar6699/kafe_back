const mongoose = require("mongoose");
const TableSchema = new mongoose.Schema({
    number: { type: String, trim: true, required: true },
    waiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Waiter",
        default: null,
    },
    products: [{
        title: { type: String },
        price: { type: Number },
        count: { type: Number },
    }, ],
    size: { type: Number, required: true },
    status: { type: Boolean, default: true },
}, { timestamps: true });
module.exports = mongoose.model("Table", TableSchema);