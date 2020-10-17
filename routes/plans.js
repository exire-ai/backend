var express = require("express");
var router = express.Router();
let venues = require("./venues/main");

router.get("/:id", venues.get);
router.post("/", venues.create);
router.delete("/:id", venues.delete);
router.patch("/:id", venues.update);

module.exports = router;