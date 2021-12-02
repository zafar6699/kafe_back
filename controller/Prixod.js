const Product = require("../model/Product");
const Prixod = require("../model/Prixod");
exports.create = (req, res) => {
    const prixod = new Prixod(req.body);
    prixod.product = req.params.id;
    prixod
        .save()
        .then(async() => {
            await Product.updateOne({ _id: req.params.id }, {
                $inc: { count: req.body.count },
                $set: { price: req.body.price },
            }).exec((err, data) => {
                if (err) return res.status(400).json({ success: false, err });
                return res.status(200).json({ success: true });
            });
        })
        .catch((err) => {
            return res.status(400).json({ success: false, err });
        });
};
exports.getAll = async(req, res) => {
    await Prixod.find({ product: req.params.id })
        .sort({ createdAt: -1 })
        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, data });
        });
};

exports.update = async(req, res) => {
    const pri = await Prixod.findOne({ _id: req.params.id });

    await Product.updateOne({ _id: pri.product }, { $inc: { count: -pri.count } }).exec(async(err, data) => {
        if (err) return res.status(400).json({ success: false, err });

        await Prixod.updateOne({ _id: req.params.id }, { $set: req.body }, { new: true },
            async(err, prixod) => {
                const last = await Prixod.find()
                    .sort({ createdAt: -1 })
                    .limit(1);
                await Product.updateOne({ _id: pri.product }, {
                    $inc: { count: req.body.count },
                    $set: { price: last[0].price },
                });
                if (err) return res.status(400).json({ success: false, err });
                return res.status(200).json({ success: true });
            }
        );
    });
};