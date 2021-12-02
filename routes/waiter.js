const express = require("express");
const router = express.Router();
const Waiter = require("../controller/Waiter");
const { protect, authorize } = require("../middleware/auth");

router.get("/all", Waiter.getAll);

module.exports = router;