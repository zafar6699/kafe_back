const mongoose = require("mongoose");
const shtrafSchema = new mongoose.Schema({
    number: { type: String, trim: true, required: true },
    waiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Waiter",
        default: null,
    },
    price: { type: Number, default: 0 },
    status: {
        type: Number,
        default: 0,
    },
    isBusy: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
module.exports = mongoose.model("shtraf", shtrafSchema);