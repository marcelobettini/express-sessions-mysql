const router = require("express").Router();
const moviesCt = require("./moviesCt");
router.get("/", moviesCt.getAll);
router.post("/", moviesCt.addOne);
module.exports = router;
