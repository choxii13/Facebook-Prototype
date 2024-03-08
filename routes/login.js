const express = require("express");
const db = require("../data/database");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/login", async function (req, res) {
  const { email, password } = req.body;

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: email });

  if (!existingUser) {
    req.session.loginFacebook = {
      hasError: true,
      message: "Email does not exists",
      email: email,
      password: password,
    };
    req.session.save(function () {
      return res.redirect("/facebook");
    });
    return;
  }

  const passwordIsMatch = await bcrypt.compare(password, existingUser.password);

  if (!passwordIsMatch) {
    req.session.loginFacebook = {
      hasError: true,
      message: "Incorrect Email or Password",
      email: email,
      password: password,
    };
    req.session.save(function () {
      return res.redirect("/facebook");
    });
    return;
  }
  req.session.user = email;
  req.session.success = "LOGIN SUCCESSFUL";
  req.session.isAuthenticated = true;
  req.session.save(function () {
    res.redirect("/facebook");
  });
});
module.exports = router;
