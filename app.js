const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const i18n = require("i18n");
const bodyParser = require("body-parser");
const db = require("./db/mongodb-database")
const usersRouter = require("./routes/UserRoutes");
const AgencyRoutes = require("./routes/AgencyRoutes");
const middleware = require("./middleware/middleware");
// base path
global.__basedir = __dirname;

// configure i18n for language locales
i18n.configure({
  locales: ["en"],
  defaultLocale: "en",
  directory: __dirname + "/locales",
});

/* ~~~~~~~~~~~~~~~~
 * Include Routes File
 * ~~~~~~~~~~~~~~~~~~~~~~
 */


let app1 = express();  // Compliant
app1.disable("x-powered-by");

/* ~~~~~~
 * Init App
 * ~~~~~~~~~
 */
const app = express();


// add headers
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization,currentPage"
  );
  next();
});
app.use(i18n.init);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));


app.use("/users", usersRouter);
app.use("/agency",middleware.verifyToken, AgencyRoutes);

require("dotenv").config();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
