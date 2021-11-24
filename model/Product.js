const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    code: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);