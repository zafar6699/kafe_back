const mongoose = require("mongoose");
const WaiterSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    number: {
        type: Number,
        required: true,
        unique: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

module.exports = mongoose.model("Waiter", WaiterSchema);