function sessionDefaultValue(req) {
  req.session.loginFacebook = null;
  req.session.changePasswordData = null;
  req.session.signUpData = null;
  req.session.success = null;

  return {
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

function saveToSession(req, res, redirectTo) {
  req.session.save(function () {
    return res.redirect(redirectTo);
  });
  return;
}

module.exports = { sessionDefaultValue, saveToSession };
