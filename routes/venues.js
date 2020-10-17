var express = require("express");
var router = express.Router();
let venues = require("./venues/main");

router.get("/:id", venues.get);

module.exports = router;