const Orders = require("../model/Order");
const Product = require("../model/Product");

exports.dashboard = async(req, res) => {
    const product = await Product.countDocuments();
    const orders = await Orders.find()
        .sort({ createdAt: -1 })
        .limit(15)
        .skip((req.query.page - 1) * 15);
    const date = new Date();
    const thisDay = date.toISOString().slice(0, 10);
    const orderThisDay = await Orders.countDocuments({
        createdAt: { $gte: new Date(thisDay) },
    });

    await Orders.find({
        createdAt: { $gte: new Date(thisDay) },
    }).exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        let thisDaySum = 0;
        let thisDayProduct = 0;

        data.forEach((item) => {
            thisDaySum = thisDaySum + item.price;
            thisDayProduct = thisDayProduct + item.product.length;
        });
        res.status(200).json({
            success: true,
            orders,
            orderThisDay,
            thisDaySum,
            thisDayProduct,
            product,
        });
    });
};