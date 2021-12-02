const express = require("express");
const router = express.Router();
const Prixod = require("../controller/Prixod");
const { protect, authorize } = require("../middleware/auth");

router.post("/create/:id", Prixod.create);
router.put("/:id", Prixod.update);
router.get("/all/:id", Prixod.getAll);

module.exports = router;