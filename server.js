const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const compression = require("compression");
const Order = require("./model/Order");
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: {
        origin: "http://localhost:4000",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true,
    },
});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(require("morgan")("tiny"));
app.use(
    compression({
        level: 6,
        threshold: 10 * 1000,
        filter: (req, res) => {
            if (req.headers["x-no-compression"]) {
                return false;
            }
            return compression.filter(req, res);
        },
    })
);

// Routes
app.use("/api/auth", require("./routes/User"));
app.use("/api/category", require("./routes/category"));
app.use("/api/waiter", require("./routes/waiter"));
app.use("/api/table", require("./routes/table"));
app.use("/api/product", require("./routes/product"));
app.use("/api/prixod", require("./routes/prixod"));
app.use("/api/order", require("./routes/order"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/statistic", require("./routes/statistic"));
require("./config/logging")();
const PORT = process.env.PORT || 80;
const DB_URI = process.env.DB_URI;

io.on("connection", function(socket) {
    console.log("socket");

    socket.on("orders", async() => {
        const data = await Order.find({ status: 1 })
            .sort({ createdAt: -1 })
            .populate(["waiter", "table"]);

        io.emit("data", data);
    });
});

http.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`);
});
// App & MongoDB Connections
mongoose
    .connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => console.log("Baza ulandi..."))
    .catch((error) => console.log("Bazaga ulanishda xatolik.\n", error));