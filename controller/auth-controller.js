const bcrypt = require("bcryptjs");
const Facebook = require("../model/facebook-model");
const validationMessage = require("../util/validation-message");
const { saveToSession } = require("../util/validation-session");
const { validationSignUp, passwordFormatFn } = require("../util/validation");

async function postLogin(req, res) {
  const { email, password } = req.body;
  const existingUser = await Facebook.findUser({ email: email });
  let passwordIsMatch = false;

  if (existingUser) {
    passwordIsMatch = await bcrypt.compare(password, existingUser.password);
  }

  if (!existingUser || !passwordIsMatch) {
    req.session.loginFacebook = {
      hasError: true,
      email: {
        value: email,
        message: validationMessage.emailLogin(existingUser, passwordIsMatch),
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
  const firstName = req.body["first-name"];
  const lastName = req.body["last-name"];
  const confirmPassword = req.body["confirm-password"];
  const { day, month, year, email, password, gender } = req.body;
  const passwordFormat = passwordFormatFn(password);

  const existingUser = await Facebook.findUser({ email: email });

  const hashedPassword = await bcrypt.hash(password, 12);
  const inputData = {
    firstName,
    lastName,
    confirmPassword,
    day,
    month,
    year,
    email,
    password: hashedPassword,
    gender,
  };

  if (!validationSignUp(inputData, password, passwordFormat, existingUser)) {
    req.session.signUpData = {
      hasError: true,
      firstName: {
        value: firstName,
        message: validationMessage.firstName(firstName),
      },
      lastName: {
        value: lastName,
        message: validationMessage.lastName(lastName),
      },
      email: {
        value: email,
        message: validationMessage.emailSignUp(email, existingUser),
      },
      password: {
        value: password,
        message: validationMessage.password(password, passwordFormat),
      },
      confirmPassword: {
        value: confirmPassword,
        message: validationMessage.confirmPassword(password, confirmPassword),
      },
      gender: {
        value: gender,
        message: validationMessage.gender(gender),
      },
    };
    saveToSession(req, res, "/facebook");
    return;
  }

  await Facebook.insertData("users", inputData);
  req.session.success = "Sign Up Successfully";
  saveToSession(req, res, "/facebook");
}

module.exports = { postSignUp, postLogin };
