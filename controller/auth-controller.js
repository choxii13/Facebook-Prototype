const { saveToSession } = require("../util/validation-session");
const sessionAuth = require("../util/session-auth");
const User = require("../model/user-model");
const validation = require("../util/validation");

async function signup(req, res) {
  const user = new User(req.body);
  const alreadyExists = await user.alreadyExists();
  console.log(alreadyExists);
  const errrorMessage = validation.signup(req.body, alreadyExists);

  if (Object.keys(errrorMessage).length !== 0) {
    req.session.signUpData = {
      hasError: true,
      firstName: {
        value: req.body.firstName,
        message: errrorMessage.firstName,
      },
      lastName: {
        value: req.body.lastName,
        message: errrorMessage.lastName,
      },
      email: {
        value: req.body.email,
        message: errrorMessage.email,
      },
      password: {
        value: req.body.password,
        message: errrorMessage.password,
      },
      confirmPassword: {
        value: req.body.confirmPassword,
        message: errrorMessage.confirmPassword,
      },
      gender: {
        value: req.body.gender,
        message: errrorMessage.gender,
      },
    };

    saveToSession(req, res, "/facebook");
    return;
  }

  await user.save();
  req.session.success = "Sign Up Successfully";
  saveToSession(req, res, "/facebook");
}

async function changePassword(req, res) {
  const user = new User(req.body);
  const alreadyExists = await user.alreadyExists();
  const errrorMessage = validation.changePassword(req.body, alreadyExists); // validation message/ errors

  if (Object.keys(errrorMessage).length !== 0) {
    req.session.changePasswordData = {
      hasError: true,
      email: {
        value: req.body.email,
        message: errrorMessage.email,
      },
      password: {
        value: req.body.password,
        message: errrorMessage.password,
      },
      confirmPassword: {
        value: req.body.confirmPassword,
        message: errrorMessage.confirmPassword,
      },
    };
    saveToSession(req, res, "/facebook");
    return;
  }

  await user.save();
  req.session.success = "Change Password Successfully";
  saveToSession(req, res, "/facebook");
}

async function login(req, res) {
  const user = new User(req.body);
  const existingUser = await user.getUserWithSameEmail();
  let passwordIsMatch;
  if (existingUser) {
    passwordIsMatch = await user.hasMatchingPassword(existingUser.password);
  }

  const error = validation.login(passwordIsMatch, existingUser);

  if (error) {
    req.session.loginFacebook = {
      hasError: true,
      email: {
        value: req.body.email,
        message: error,
      },
      password: {
        value: req.body.password,
        message: null,
      },
    };
    saveToSession(req, res, "/facebook");
    return;
  }
  sessionAuth.sessionAuth(req, res, existingUser, "/facebook");
}

function logout(req, res) {
  sessionAuth.removeAuth(req, res, "/facebook");
}

module.exports = {
  login: login,
  signup: signup,
  logout: logout,
  changePassword: changePassword,
};
