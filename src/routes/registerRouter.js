const auth = require("../controllers/authController.js");
const router = require("express").Router();
router.get("/", auth.registerForm);
router.post("/", auth.registerProcess);
module.exports = router;
