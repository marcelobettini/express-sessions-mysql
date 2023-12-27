const homeCt = require("./homeCt");

const router = require("express").Router();
router.get("/", homeCt.renderIndex);
module.exports = router;
