const express = require("express");
const router = express.Router();
const Order = require("../controller/Order");
const { protect, authorize } = require("../middleware/auth");

router.post("/create", Order.create);
router.put("/count/:id", Order.updateCount);
router.get("/:id", Order.getOne);
router.get("/now/:id", Order.getNow);
router.get("/kassa/now/", Order.getKassaNow);
router.get("/all", Order.getAll);

module.exports = router;