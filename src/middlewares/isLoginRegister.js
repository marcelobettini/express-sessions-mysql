const isLoginRegister = (req, res, next) => {
  !req.session.user ? next() : res.redirect("/");
};
module.exports = isLoginRegister;
