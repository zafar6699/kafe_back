const Category = require("../controller/Category");
const express = require("express");
const router = express.Router();

router.post("/add", Category.create);
router.get("/all", Category.getAll);
router.put("/:id", Category.edit);
router.delete("/:id", Category.delete);

module.exports = router;