const Order = require("../model/Order");
const Product = require("../model/Product");
const Table = require("../model/Table");

exports.create = async(req, res) => {
    const lastDat = await Order.findOne().sort({ createdAt: -1 }).exec();
    const num = lastDat ? lastDat.order + 1 : 1;
    const order = new Order(req.body);
    order.order = num;
    order
        .save()
        .then(async() => {
            await Table.updateOne({ _id: req.body.table }, { $set: { waiter: req.body.waiter, isBusy: true } });

            for (let i = 0; i < req.body.products.length; i++) {
                await Product.updateOne({ _id: req.body.products[i].product }, { $inc: { count: -req.body.products[i].count } }, { new: true }).exec((err, data) => {
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
exports.getAll = async(req, res) => {
    await Order.find()
        .sort({ createdAt: -1 })
        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, data });
        });
};

exports.getNow = async(req, res) => {
    await Order.find({ status: 1, waiter: req.params.id })
        .sort({ createdAt: -1 })
        .populate(["waiter", "table"])
        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, data });
        });
};
exports.getKassaNow = async(req, res) => {
    await Order.find({ status: 1 })
        .sort({ createdAt: -1 })
        .populate(["waiter", "table"])
        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, data });
        });
};
exports.updateCount = async(req, res) => {
    await Order.updateOne({
        _id: req.params.id,
        products: { $elemMatch: { _id: req.body.product } },
    }, {
        $set: {
            "products.$.count": req.body.count,
        },
    }).exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, data });
    });
};
exports.getOne = async(req, res) => {
    await Order.findOne({ _id: req.params.id })
        .populate(["waiter", "table"])
        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, data });
        });
};
exports.edit = async(req, res) => {
    await Order.updateOne({ _id: req.params.id }, { $set: req.body }, { new: true }).exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, data });
    });
};
exports.rm = async(req, res) => {
    await Order.deleteOne({ _id: req.params.id }).exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, data });
    });
};