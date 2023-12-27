const router = require("express").Router();
const {
  loginValidationRules,
  handleLoginValidation,
  registerValidationRules,
  handleRegisterValidation,
} = require("../../middlewares/formValidator.js");
const authCt = require("./authCt.js");
router.get("/login", authCt.loginForm);
router.post(
  "/login",
  loginValidationRules,
  handleLoginValidation,
  authCt.loginProcess
);
router.get("/register", authCt.registerForm);
router.get("/logout", authCt.logout);
router.post(
  "/register",
  registerValidationRules,
  handleRegisterValidation,
  authCt.registerProcess
);
module.exports = router;
