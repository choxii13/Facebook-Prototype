const express = require("express");
const app = express();
const path = require("path");
const db = require("./data/database");
const session = require("express-session");
const { sessionConfig, sessionDetails } = require("./config/session-config");
const sessionStore = sessionConfig(session);

const csrf = require("csurf");

const facebookRoutes = require("./routes/facebook-routes");
const authRoutes = require("./routes/auth-routes");
const postImageRoutes = require("./routes/post-image-routes");

const csrfTokenMiddleware = require("./middleware/csrf-token");
const guardRoutesMiddleware = require("./middleware/guard-routes");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(session(sessionDetails(sessionStore)));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(express.static("image_upload"));

app.use(csrf());
app.use(csrfTokenMiddleware);
app.use(guardRoutesMiddleware);

app.use(facebookRoutes);
app.use("/facebook", authRoutes);
app.use("/facebook", postImageRoutes);

app.use(errorHandlerMiddleware.error500);
app.use(errorHandlerMiddleware.error404);
db.connectToDatabase().then(function () {
  app.listen(3000);
});
