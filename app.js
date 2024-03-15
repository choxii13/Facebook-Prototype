const session = require("express-session");
const { sessionConfig, sessionDetails } = require("./config/session-config");
const sessionStore = sessionConfig(session); // session

const db = require("./data/database"); // database

const csrf = require("csurf"); // csrf attacks

const path = require("path");
const express = require("express");
const app = express(); // express
const facebook = require("./routes/facebook-route");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // ejs

app.use(session(sessionDetails(sessionStore))); // session

app.use(express.static("public")); //static

app.use("/image_upload", express.static("image_upload")); // file upload

app.use(express.urlencoded({ extended: false }));
// app.use(csrf());
app.use(facebook);

// app.use(async function (req, res, next) {
//   const isAuth = req.session.isAuthenticated;
//   if (!isAuth) {
//     next();
//   }
//   res.locals.isAuth = isAuth;
//   next();
// });

// app.use(function (error, req, res, next) {
//   res.render("500");
// });

// app.use(function (req, res) {
//   res.render("404");
// });

db.connectToDatabase().then(function () {
  app.listen(3000);
});
