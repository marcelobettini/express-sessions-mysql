const auth = require("../controllers/authController.js");
const router = require("express").Router();
router.get("/", auth.loginForm);
router.post("/", auth.loginProcess);
module.exports = router;
