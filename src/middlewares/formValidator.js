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
    .matches(/^[A-Za-z\s]+$/) // Allows letters and spaces
    .withMessage("Only letters and spaces are allowed")
    .notEmpty()
    .withMessage("Field is required")
    .escape(),
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
  check("repeatPassword")
    .exists()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error();
      }
      return true;
    })
    .withMessage("Passwords must match"),
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
