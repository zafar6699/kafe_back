const Table = require("../model/Table");
exports.create = (req, res) => {
    const table = new Table(req.body);
    table
        .save()
        .then(() => {
            res.status(201).json({ success: true });
        })
        .catch((err) => {
            res.status(400).json({ success: false, err });
        });
    console.log();
};
exports.edit = async(req, res) => {
    await Table.updateOne({ _id: req.params.id }, {
        $set: req.body,
    }).exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, data });
    });
};
exports.getOrder = async(req, res) => {
    await Table.updateOne({ _id: req.params.id, products: { $exists: true } }, {
        $set: {
            waiter: req.body.waiter,
            products: req.body.products,
        },
    }).exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, data });
    });
};

exports.editOne = async(req, res) => {
    await Table.updateOne({
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

exports.getAll = async(req, res) => {
    const table = await Table.find();
    res.status(200).json({ success: true, data: table });
};
exports.getForApp = async(req, res) => {
    const table = await Table.find({ isBusy: false });
    res.status(200).json({ success: true, data: table });
};
exports.getOne = async(req, res) => {
    await Table.findOne({ _id: req.params.id }).exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, data });
    });
};
exports.delete = async(req, res) => {
    await Table.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: [] });
};