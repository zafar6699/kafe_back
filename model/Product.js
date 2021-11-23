const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    count: { type: Number, default: 0, min: 0 },
    type: { type: Number, required: true, enum: [1, 2, 3] }, // 1-kg , 2-dona, 3-metr
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    status: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);