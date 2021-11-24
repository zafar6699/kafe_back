const express = require("express");
const router = express.Router();
const Product = require("../controller/Product");
const { protect, authorize } = require("../middleware/auth");

router.post("/add", Product.create);
router.post("/all", Product.getAll);
router.get("/:id", Product.getOne);
router.put("/:id", Product.updateProduct);
router.get("/category/:id", Product.getByCategory);
router.delete("/:id", Product.rm);

module.exports = router;