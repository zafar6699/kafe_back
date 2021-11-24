const Table = require("../controller/Table");
const express = require("express");
const router = express.Router();

router.post("/add", Table.create);
router.get("/all", Table.getAll);
router.get("/app", Table.getForApp);
router.get("/:id", Table.getOne);
router.put("/:id", Table.edit);
router.put("/order/:id", Table.getOrder);
router.put("/one/:id", Table.editOne);
router.delete("/rm/:id", Table.deleteOne);
router.delete("/:id", Table.delete);

module.exports = router;