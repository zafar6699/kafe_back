const Order = require("../model/Order");
const Product = require("../model/Product");

exports.create = async (req, res) => {
    const lastDat = await Order.findOne().sort({ createdAt: -1 }).exec();
    const num = lastDat ? lastDat.order + 1 : 1;
    const order = new Order(req.body);
    order.order = num;
    order
        .save()
        .then(async () => {
            for (let i = 0; i < req.body.product.length; i++) {
                await Product.updateOne(
                    { code: req.body.product[i].code },
                    { $inc: { count: -req.body.product[i].count } },
                    { new: true }
                ).exec((err, data) => {
                    if (err)
                        return res.status(400).json({ success: false, err });
                    console.log("-");
                });
            }
            return res.status(200).json({ success: true, num: order.order });
        })
        .catch((err) => {
            return res.status(400).json({ success: false, err });
        });
};
exports.getAll = async (req, res) => {
    await Order.find()
        .sort({ createdAt: -1 })
        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, data });
        });
};
exports.byId = async (req, res) => {
    await Order.find({ _id: req.params.id })
        // .sort({ createdAt: -1 })
        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, data });
        });
};
exports.edit = async (req, res) => {
    await Order.updateOne(
        { _id: req.params.id },
        { $set: req.body },
        { new: true }
    ).exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, data });
    });
};
exports.rm = async (req, res) => {
    await Order.deleteOne({ _id: req.params.id }).exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, data });
    });
};
