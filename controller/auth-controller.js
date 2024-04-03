const bcrypt = require("bcryptjs");
const Facebook = require("../model/facebook-model");
const { saveToSession } = require("../util/validation-session");
const { Validation, passwordFormatFn } = require("../util/validation-class");

async function postLogin(req, res) {
  const { email, password } = req.body;
  const existingUser = await Facebook.findUser({ email: email });
  let passwordIsMatch;

  if (existingUser) {
    passwordIsMatch = await bcrypt.compare(password, existingUser.password);
  }

  const error = Validation.logIn(passwordIsMatch, existingUser);

  if (error) {
    req.session.loginFacebook = {
      hasError: true,
      email: {
        value: email,
        message: error,
      },
      password: {
        value: password,
        message: null,
      },
    };
    saveToSession(req, res, "/facebook");
    return;
  }
  req.session.user = email; // need to be changed// need an id
  req.session.isAuthenticated = true;
  saveToSession(req, res, "/facebook");
}

async function postSignUp(req, res) {
  const { firstName, lastName, gender, email, password, confirmPassword } =
    req.body;
  const passwordFormat = passwordFormatFn(password);
  const existingUser = await Facebook.findUser({ email: email });

  const value = new Validation(
    firstName,
    lastName,
    password,
    confirmPassword,
    gender,
    existingUser,
    email,
    passwordFormat
  );
  value.SignUp();

  if (Object.keys(value.message).length !== 0) {
    req.session.signUpData = {
      hasError: true,
      firstName: {
        value: value.firstName,
        message: value.message.firstName,
      },
      lastName: {
        value: value.lastName,
        message: value.message.lastName,
      },
      email: {
        value: value.email,
        message: value.message.email,
      },
      password: {
        value: value.password,
        message: value.message.password,
      },
      confirmPassword: {
        value: value.confirmPassword,
        message: value.message.confirmPassword,
      },
      gender: {
        value: value.gender,
        message: value.message.gender,
      },
    };
    saveToSession(req, res, "/facebook");
    return;
  } else {
    const hashedPassword = await bcrypt.hash(password, 12);
    const { confirmPassword, ...newReqBody } = req.body;
    await Facebook.insertData("users", {
      ...newReqBody,
      password: hashedPassword,
      imagePath: "styles/main-facebook/images/no-profile.png",
    });
    req.session.success = "Sign Up Successfully";
    saveToSession(req, res, "/facebook");
  }
}

function postLogOut(req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/facebook");
}
module.exports = { postSignUp, postLogin, postLogOut };
