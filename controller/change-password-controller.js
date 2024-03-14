const Facebook = require("../model/facebook-model");
const bcrypt = require("bcryptjs");
const {
  validationChangePassword,
  passwordFormatFn,
} = require("../util/validation");
const { saveToSession } = require("../util/validation-session");
const validationMessage = require("../util/validation-message");

async function postChangePassword(req, res) {
  const { email, password } = req.body;
  const confirmPassword = req.body["confirm-password"];
  const passwordFormat = passwordFormatFn(password);

  const existingUser = await Facebook.findUser({ email: email });

  if (
    !validationChangePassword(
      email,
      password,
      confirmPassword,
      passwordFormat,
      existingUser
    )
  ) {
    req.session.changePasswordData = {
      hasError: true,
      email: {
        value: email,
        message: validationMessage.emailChangePassword(email, existingUser),
      },
      password: {
        value: password,
        message: validationMessage.password(password, passwordFormat),
      },
      confirmPassword: {
        value: confirmPassword,
        message: validationMessage.confirmPassword(password, confirmPassword),
      },
    };
    saveToSession(req, res, "/facebook");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await Facebook.updateData({ email: email }, { password: hashedPassword });
  req.session.success = "Change Password Successfully";
  saveToSession(req, res, "/facebook");
}

module.exports = postChangePassword;
