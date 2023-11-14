const authController = {
  loginForm: (req, res) => {
    res.render("pages/login", { title: "Login Page" });
  },
  loginProcess: (req, res) => {
    req.session.user = req.body;
    res.redirect("/dashboard");
  },
  registerForm: (req, res) => {
    res.render("pages/register", { title: "Register Page" });
  },
  registerProcess: (req, res) => {},
};
module.exports = authController;
