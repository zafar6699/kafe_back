const Order = require("../model/Order");

exports.statistic = async (req, res) => {
    const count = await Order.aggregate([
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
            },
        },
    ]);
    await Order.aggregate([
        {
            $group: {
                _id: {
                    $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                count: { $sum: 1 },
                sum: { $sum: "$price" },
            },
        },
        { $sort: { _id: -1 } },
        { $skip: (req.query.page - 1) * 20 },
        { $limit: 20 },
    ]).exec((err, data) => {
        if (err) return res.status(400).json({ success: false, err });
        return res
            .status(200)
            .json({ success: true, count: count.length, data });
    });
};
