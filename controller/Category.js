const Category = require("../model/Category");
exports.create = (req, res) => {
    const category = new Category(req.body);
    category
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
    await Category.updateOne({ _id: req.params.id }, {
        $set: req.body,
    }).exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, data });
    });
};
exports.getAll = async(req, res) => {
    const category = await Category.find();
    res.status(200).json({ success: true, data: category });
};

exports.delete = async(req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, data: [] });
};