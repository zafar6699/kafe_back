const Product = require("../model/Product");
const Prixod = require("../model/Prixod");
exports.create = (req, res) => {
    const product = new Product(req.body);
    product
        .save()
        .then(() => {
            res.status(201).json({ success: true, data: product });
        })
        .catch((err) => {
            res.status(400).json({ success: false, err });
        });
    console.log();
};
exports.getAll = async(req, res) => {
    const page = parseInt(req.body.page);
    const limit = parseInt(req.body.limit);

    let find = {};

    if (req.body.code && req.body.code.length) {
        find = { code: parseInt(req.body.code) };
    }

    const count = await Product.countDocuments();

    await Product.find(find)
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
exports.getOneKassa = async(req, res) => {
    let product = await Product.find({
        code: req.params.id,
        count: { $gt: 0 },
    });
    if (product && product.length) {
        let prixod = await Prixod.find({ product: product[0]._id })
            .sort({ createdAt: -1 })
            .limit(1);

        return res.status(200).json({
            success: true,
            data: {
                product: product[0],
                price: prixod[0].price,
                perPrice: prixod[0].perPrice,
                type: product[0].type,
            },
        });
    } else {
        return res.status(200).json({
            success: true,
            data: { product: null, price: null, perPrice: null },
        });
    }

    // await Product.find({ code: req.params.id, count: { $gt: 0 } }).exec(
    //     (err, data) => {
    //         if (err) return res.status(400).json({ success: false, err });
    //         return res.status(200).json({ success: true, data });
    //     }
    // );
};

exports.getFast = async(req, res) => {
    let product = await Product.find({
        status: true,
        count: { $gt: 0 },
    });

    return res.status(200).json({
        success: true,
        data: product,
    });
};
exports.getByCode = async(req, res) => {
    await Product.findOne({ code: req.params.code }).exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({ success: true, data });
    });
};
exports.createPrixod = (req, res) => {
    const prixod = new Prixod(req.body);
    prixod.product = req.params.id;
    prixod
        .save()
        .then(async() => {
            // console.log(req.body.count);
            await Product.updateOne({ _id: req.params.id }, { $inc: { count: req.body.count } }).exec((err, data) => {
                if (err) return res.status(400).json({ success: false, err });
                return res.status(200).json({ success: true });
            });
        })
        .catch((err) => {
            return res.status(400).json({ success: false, err });
        });
};
exports.getPrixods = async(req, res) => {
    await Prixod.find({ product: req.params.id })
        .sort({ createdAt: -1 })
        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, data });
        });
};
exports.getAllPrixods = async(req, res) => {
    await Prixod.find()
        .sort({ createdAt: -1 })
        .exec((err, data) => {
            if (err) return res.status(400).json({ success: false, err });
            return res.status(200).json({ success: true, data });
        });
};
exports.editPrixod = async(req, res) => {
    const pri = await Prixod.findOne({ _id: req.params.id });
    await Product.updateOne({ _id: pri.product }, { $inc: { count: -pri.count } }).exec(async(err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        await Product.updateOne({ _id: pri.product }, { $inc: { count: req.body.count } });
        await Prixod.updateOne({ _id: req.params.id }, { $set: req.body }, { new: true },
            (err, prixod) => {
                if (err) return res.status(400).json({ success: false, err });
                return res.status(200).json({ success: true });
            }
        );
    });
};