const crypto = require("node:crypto");
const { passHash } = require("../../utils/passHash.js");
const { usersMd } = require("../users/usersMd.js");
const auth = {
  loginForm: (req, res) => {
    res.render("pages/login", { prevValues: {}, errors: [] });
  },
  loginProcess: async (req, res) => {
    const { email, password } = req.body;
    const isUser = await usersMd.getByEmail(email);
    if (!isUser) {
      return res.send("Usuario o contraseña incorrectos");
    }
    console.log("password:", password);
    console.log("password in DB:", isUser.password);

    const passwordOk = await passHash.decrypt(password, isUser.password);
    if (!passwordOk) {
      return res.send("Usuario o contraseña incorrectos");
    }

    req.session.user = req.body;
    res.locals.user = req.session.user;
    // res.redirect("/");
    /* guardar la sesión antes de redirigir, porque el procedimiento es
    async y puede ocurrir que al llegar al sitio de redirección
    no se muestren los datos de sesión aún */
    req.session.save(err => {
      if (err) {
        console.error(err);
      }
      res.redirect("/");
    });
  },
  logout: (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error("Error destroying session:", err);
      } else {
        res.locals.user = "";
      }
    });
    res.redirect("/");
  },
  registerForm: (req, res) => {
    res.render("pages/register", { prevValues: {}, errors: [] });
  },
  registerProcess: async (req, res) => {
    const { name, email, password } = req.body;
    const pass = await passHash.encrypt(password);
    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password: pass,
    };
    await usersMd.addOne(newUser);
    res.send("ok");
  },
};

module.exports = auth;
