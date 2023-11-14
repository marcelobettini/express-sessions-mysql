const express = require("express");
const path = require("path");
const session = require("express-session");
const mysqlStore = require("express-mysql-session")(session);
const loginRouter = require("./routes/loginRouter.js");
const registerRouter = require("./routes/registerRouter.js");
const usersRouter = require("./routes/usersRouter.js");
const app = express();
const PORT = process.env.PORT ?? 3000;
const IS_IN_PROD = process.env.NODE_ENV === "production";
const ONE_MINUTE = 1000 * 60;
const ONE_DAY = 1000 * 60 * 60 * 24;

const isAuth = require("./middlewares/isAuth.js");
const isLoginRegister = require("./middlewares/isLoginRegister.js");
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "public")));

const options = {
  connectionLimit: 10,
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  database: process.env.DB_SESSIONS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  createDatabaseTable: true,
};

const sessionStore = new mysqlStore(options);
app.use(
  session({
    // name: process.env.SESSION_NAME, coonnect.sid by default
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      httpOnly: true,
      maxAge: ONE_DAY,
      sameSite: true,
      secure: IS_IN_PROD,
    },
  })
);

app.get("/", (req, res) => {
  res.render("pages/index", { title: "Home Page", user: req.session.user });
});
app.get("/dashboard", isAuth, (req, res) => {
  res.render("pages/dashboard", {
    title: "Dashboard Page",
    user: req.session.user,
  });
});

app.use("/login", isLoginRegister, loginRouter);
app.use("/register", isLoginRegister, registerRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
