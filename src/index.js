const express = require("express");
const session = require("express-session");
const mysqlStore = require("express-mysql-session")(session);
const cookieParser = require("cookie-parser");
const path = require("path");
const moviesRt = require("./features/movies/moviesRt.js");
const homeRt = require("./features/home/homeRt.js");
const authRt = require("./features/auth/authRt.js");

const app = express();
const PORT = process.env.PORT ?? 3000;
const IS_IN_PROD = process.env.NODE_ENV === "production"; //Bool, if secure->https cert required
const ONE_MINUTE = 1000 * 60;
const ONE_DAY = 1000 * 60 * 60 * 24;

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(cookieParser());
app.use((req, res, next) => {
  res.locals.currentRoute = req.path;
  res.locals.user = req.session || "";
  /* Express proporciona el objeto res.locals de forma predeterminada para cada solicitud. No se necesita configuración adicional para utilizarlo. Los datos que se almacenan en res.locals son accesibles a lo largo de la solicitud y específicos para esa solicitud.*/
  next();
});

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
    // name: process.env.SESSION_NAME, connect.sid by default
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

app.get("/", homeRt);
app.use("/auth", authRt);
app.use("/movies", moviesRt);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
