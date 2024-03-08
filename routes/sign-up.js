const express = require("express");
const db = require("../data/database");
const bcrypt = require("bcryptjs");
const router = express.Router();
const validation = require("../util/validation");

router.post("/sign-up", async function (req, res) {
  const firstNameEntered = req.body["first-name"];
  const lastNameEntered = req.body["last-name"];
  const confirmPasswordEntered = req.body["confirm-password"];
  const { day, month, year, email, password, gender } = req.body;
  const passwordFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
    password
  );
  const existingUser = await db
    .getDb()
    .collection("users")
    .findOne({ email: email });

  if (
    !firstNameEntered ||
    !lastNameEntered ||
    !email ||
    !email.endsWith("@gmail.com") ||
    !password ||
    existingUser ||
    !passwordFormat ||
    !confirmPasswordEntered ||
    password !== confirmPasswordEntered ||
    !gender
  ) {
    req.session.signUpData = {
      hasError: true,
      firstName: {
        value: firstNameEntered,
        message: validation.firstName(firstNameEntered),
      },
      lastName: {
        value: lastNameEntered,
        message: validation.lastName(lastNameEntered),
      },
      email: {
        value: email,
        message: validation.emailSignUp(email, existingUser),
      },
      password: {
        value: password,
        message: validation.password(password, passwordFormat),
      },
      confirmPassword: {
        value: confirmPasswordEntered,
        message: validation.confirmPassword(password, confirmPasswordEntered),
      },
      gender: {
        value: gender,
        message: validation.gender(gender),
      },
    };

    req.session.save(function () {
      return res.redirect("/facebook");
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await db.getDb().collection("users").insertOne({
    firstName: firstNameEntered,
    lastName: lastNameEntered,
    email,
    password: hashedPassword,
    gender,
    month,
    year,
    day,
  });

  req.session.success = "Sign Up Successfully";
  req.session.save(function () {
    return res.redirect("/facebook");
  });
});

module.exports = router;
