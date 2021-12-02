const Waiter = require("../model/Waiter");

exports.getAll = async(req, res) => {
    const table = await Waiter.find();
    res.status(200).json({ success: true, data: table });
};