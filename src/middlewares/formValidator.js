const { check, validationResult } = require("express-validator");
const loginValidationRules = [
  check("email")
    .exists()
    .isEmail()
    .withMessage("Must be a valid email")
    .notEmpty()
    .withMessage("Field is required")
    .escape(),
  check("password")
    .exists()
    .isLength({ min: 8, max: 20 })
    .withMessage("8 characters min, 20 characters max")
    .notEmpty()
    .withMessage("Field is required")
    .trim()
    .escape(),
];
const registerValidationRules = [
  check("name")
    .exists()
    .isAlpha()
    .withMessage("Only letters and spaces")
    .withMessage("Must be a valid email")
    .notEmpty()
    .withMessage("Field is required")
    .escape(),
  ,
  check("email")
    .exists()
    .isEmail()
    .withMessage("Must be a valid email")
    .notEmpty()
    .withMessage("Field is required")
    .escape(),
  check("password")
    .exists()
    .isLength({ min: 8, max: 20 })
    .withMessage("8 characters min, 20 characters max")
    .notEmpty()
    .withMessage("Field is required")
    .trim()
    .escape(),
];

const handleLoginValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    next();
  } else {
    const prevValues = req.body;
    res.render("pages/login", { prevValues, errors: errors.array() });
  }
};
const handleRegisterValidation = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    next();
  } else {
    const prevValues = req.body;
    res.render("pages/register", { prevValues, errors: errors.array() });
  }
};

module.exports = {
  loginValidationRules,
  registerValidationRules,
  handleLoginValidation,
  handleRegisterValidation,
};
