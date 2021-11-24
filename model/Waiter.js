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
}, { timestamps: true });

module.exports = mongoose.model("Waiter", WaiterSchema);