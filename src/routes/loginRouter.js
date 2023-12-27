const auth = require("../controllers/authController.js");
const router = require("express").Router();

router.get("/", auth.loginForm);
router.get("/logout", auth.logout);
router.post("/", auth.loginProcess);

module.exports = router;
