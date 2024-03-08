const express = require("express");
const db = require("../data/database");
const bcrypt = require("bcryptjs");
const router = express.Router();
const { days, months, years, leftSection } = require("../util/data");
const validation = require("../util/validation");

router.get("/facebook", async function (req, res) {
  if (req.session.isAuthenticated) {
    const postDetails = await db
      .getDb()
      .collection("post-detail")
      .find()
      .toArray();
    postDetails.reverse();
    return res.render("main-facebook", {
      postDetails: postDetails,
      leftSection,
    });
  }

  let signUpData = req.session.signUpData;
  let success = req.session.success;
  let changePasswordData = req.session.changePasswordData;
  let loginFacebook = req.session.loginFacebook;

  if (!loginFacebook) {
    loginFacebook = {
      hasError: false,
      message: "",
      email: "",
      password: "",
    };
  }

  if (!changePasswordData) {
    changePasswordData = {
      hasError: false,
      email: {
        value: "",
        message: "",
      },
      password: {
        value: "",
        message: "",
      },
      confirmPassword: {
        value: "",
        message: "",
      },
    };
  }

  if (!signUpData) {
    signUpData = {
      hasError: false,
      firstName: {
        value: "",
        message: "",
      },
      lastName: {
        value: "",
        message: "",
      },
      email: {
        value: "",
        message: "",
      },
      password: {
        value: "",
        message: "",
      },
      confirmPassword: {
        value: "",
        message: "",
      },
      gender: {
        value: "",
        message: "",
      },
    };
  }
  req.session.loginFacebook = null;
  req.session.changePasswordData = null;
  req.session.signUpData = null;
  req.session.success = null;

  res.render("login-facebook", {
    date: { days, months, years },
    inputData: signUpData,
    success: success,
    changePassword: changePasswordData,
    loginFacebook,
  });
});

module.exports = router;
