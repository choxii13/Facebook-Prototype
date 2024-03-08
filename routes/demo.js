// const express = require("express");
// const db = require("../data/database");
// const bcrypt = require("bcryptjs");
// const router = express.Router();
// const mongodb = require("mongodb");
// router.get("/", function (req, res) {
//   res.render("welcome");
// });

// router.get("/signup", function (req, res) {
//   let sessionData = req.session.inputData;
//   if (!sessionData) {
//     sessionData = {
//       hasError: false,
//       message: "",
//       email: "",
//       password: "",
//     };
//   }
//   req.session.inputData = null;
//   res.render("signup", { inputData: sessionData });
// });

// router.get("/login", function (req, res) {
//   let sessionData = req.session.inputData;
//   if (!sessionData) {
//     sessionData = {
//       hasError: false,
//       message: "",
//       email: "",
//       password: "",
//     };
//   }
//   req.session.inputData = null;
//   res.render("login", { inputData: sessionData });
// });

// router.post("/signup", async function (req, res) {
//   const data = req.body;
//   const emailEntered = data.email;
//   const confirmEmailEntered = data["confirm-email"];
//   const passwordEntered = data.password;

//   if (
//     !emailEntered ||
//     !confirmEmailEntered ||
//     !passwordEntered ||
//     emailEntered !== confirmEmailEntered ||
//     passwordEntered.trim() < 6
//   ) {
//     req.session.inputData = {
//       hasError: true,
//       message: "Please input exact data",
//       emailEntered: emailEntered,
//       confirmEmailEntered: confirmEmailEntered,
//       password: passwordEntered,
//     };
//     req.session.save(function () {
//       return res.redirect("/signup");
//     });
//     return;
//   }

//   const existingUser = await db
//     .getDb()
//     .collection("users")
//     .findOne({ email: emailEntered });

//   if (existingUser) {
//     req.session.inputData = {
//       hasError: true,
//       message: "Email already exists",
//       emailEntered: emailEntered,
//       password: passwordEntered,
//     };
//     req.session.save(function () {
//       return res.redirect("/signup");
//     });
//     return;
//   }

//   const hashedPassword = await bcrypt.hash(passwordEntered, 12);
//   res.session.isAuthenticated = true;
//   await db
//     .getDb()
//     .collection("users")
//     .insertOne({ email: emailEntered, password: hashedPassword });
//   res.redirect("/login");
// });

// router.post("/login", async function (req, res) {
//   const data = req.body;
//   const emailEntered = data.email;
//   const passwordEntered = data.password;
//   const existingUser = await db
//     .getDb()
//     .collection("users")
//     .findOne({ email: emailEntered });

//   if (!existingUser) {
//     req.session.inputData = {
//       hasError: true,
//       message: "Email does not exists",
//       emailEntered: emailEntered,
//       password: passwordEntered,
//     };
//     req.session.save(function () {
//       return res.redirect("/login");
//     });
//     return;
//   }

//   const passwordIsCorrect = await bcrypt.compare(
//     passwordEntered,
//     existingUser.password
//   );

//   if (!passwordIsCorrect) {
//     return res.redirect("/login");
//   }
//   // const newId = new ObjectId(existingUser._id);
//   // console.log(newId);

//   req.session.user = {
//     email: emailEntered,
//   };
//   req.session.isAuthenticated = true;
//   req.session.save(function () {
//     res.redirect("/profile");
//   });
// });

// router.get("/admin", async function (req, res) {
//   // console.log(req.session.isAuthenticated);

//   if (!req.session.isAuthenticated) {
//     return res.status(401).render("401");
//   }

//   const user = await db
//     .getDb()
//     .collection("users")
//     .findOne({ email: req.session.user.email });
//   if (!user || !user.isAdmin) {
//     return res.status(403).render("403");
//   }
//   res.render("admin");
// });

// router.get("/profile", function (req, res) {
//   if (!req.session.isAuthenticated) {
//     return res.status(401).render("401");
//   }
//   res.render("profile");
// });
// router.post("/logout", function (req, res) {
//   req.session.user = null;
//   req.session.isAuthenticated = false;
//   res.redirect("/");
// });

// module.exports = router;
