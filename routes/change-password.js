const express = require("express");
const db = require("../data/database");
const bcrypt = require("bcryptjs");
const router = express.Router();
const validation = require("../util/validation");

router.post("/change-password", async function (req, res) {
  const { email, password } = req.body;
  const confirmPasswordEntered = req.body["confirm-password"];

  const passwordFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
    password
  );

  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: email });

  if (
    !email ||
    !email.endsWith("@gmail.com") ||
    !password ||
    !passwordFormat ||
    !confirmPasswordEntered ||
    password !== confirmPasswordEntered ||
    !existingUser
  ) {
    req.session.changePasswordData = {
      hasError: true,
      email: {
        value: email,
        message: validation.emailChangePassword(email, existingUser),
      },
      password: {
        value: password,
        message: validation.password(password, passwordFormat),
      },
      confirmPassword: {
        value: confirmPasswordEntered,
        message: validation.confirmPassword(password, confirmPasswordEntered),
      },
    };
    req.session.save(function () {
      return res.redirect("/facebook");
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await db
    .getDb()
    .collection("users")
    .updateOne({ email: email }, { $set: { password: hashedPassword } });

  req.session.success = "Change Password Successfully";
  req.session.save(function () {
    return res.redirect("/facebook");
  });
});

module.exports = router;
