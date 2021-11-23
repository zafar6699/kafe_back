const Statistic = require("../controller/Statistic");
const express = require("express");
const router = express.Router();

router.get("/all", Statistic.statistic);

module.exports = router;
