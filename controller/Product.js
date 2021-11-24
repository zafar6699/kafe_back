const Product = require("../model/Product");
exports.create = (req, res) => {
    const product = new Product(req.body);
    product
        .save()
        .then(() => {
            res.status(201).json({ success: true });
        })
        .catch((err) => {
            res.status(400).json({ success: false, err });
        });
    console.log();
};
exports.getAll = async(req, res) => {
    const page = parseInt(req.body.page);
    const limit = parseInt(req.body.limit);

    const count = await Product.countDocuments();

    await Product.find()
        .sort({ createdAt: -1 })
        .populate("category")
        .skip((page - 1) * limit)
        .limit(limit)
        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, data, count });
        });
};
exports.updateProduct = async(req, res) => {
    await Product.updateOne({ _id: req.params.id }, { $set: req.body }, { new: true },
        (err, data) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true });
        }
    );
};
exports.rm = async(req, res) => {
    await Product.deleteOne({ _id: req.params.id }, (err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true });
    });
};
exports.getOne = async(req, res) => {
    await Product.findOne({ _id: req.params.id }).exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, data });
    });
};

exports.getByCategory = async(req, res) => {
    await Product.find({ category: req.params.id }).exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, data });
    });
};