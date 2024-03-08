const path = require("path");
const express = require("express");
const db = require("./data/database");
// const demoRoutes = require("./routes/demo");
const session = require("express-session");
const mongodbStore = require("connect-mongodb-session");
const MongoDbStore = mongodbStore(session);
const facebook = require("./routes/facebook");
const creatingPost = require("./routes/creating-post");
const login = require("./routes/login");
const signUp = require("./routes/sign-up");
const changePassword = require("./routes/change-password");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionStore = new MongoDbStore({
  uri: "mongodb://localhost:27017",
  databaseName: "auth-demo",
  collections: "sessions",
});

app.use(
  session({
    secret: "super-secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  })
);
app.use(express.static("public"));
app.use("/image_upload", express.static("image_upload"));
app.use(express.urlencoded({ extended: false }));

app.use(facebook);
app.use(login);
app.use(changePassword);
app.use(signUp);
app.use(creatingPost);
// app.use(async function (req, res, next) {
//   const user = req.session.user;
//   const isAuth = req.session.isAuthenticated;
//   if (!user || !isAuth) {
//     return next(); //
//   }
//   const userDoc = await db
//     .getDb()
//     .collection("users")
//     .findOne({ email: user.email });
//   console.log(userDoc);
//   const isAdmin = userDoc.isAdmin;
//   res.locals.isAuth = isAuth;
//   res.locals.isAdmin = isAdmin; // same
//   next();
// });

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

db.connectToDatabase().then(function () {
  app.listen(3000);
});
