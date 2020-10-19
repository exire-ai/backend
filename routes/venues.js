var express = require("express");
var router = express.Router();
let venues = require("./venues/main");

router.get("/:id", venues.get);
router.post("/search/:radius", venues.search);
router.get("/detailed/:place_id", venues.detailed);
router.post("/detailedList", venues.detailedList);

module.exports = router;