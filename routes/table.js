const Table = require("../controller/Table");
const express = require("express");
const router = express.Router();

router.post("/add", Table.create);
router.get("/all", Table.getAll);
router.get("/app", Table.getForApp);
router.get("/:id", Table.getOne);
router.put("/:id", Table.edit);
router.delete("/:id", Table.delete);

module.exports = router;