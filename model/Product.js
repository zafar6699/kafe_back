const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    count: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        default: 0,
    },
    status: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);