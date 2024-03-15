const Facebook = require("../model/facebook-model");
const bcrypt = require("bcryptjs");
const { saveToSession } = require("../util/validation-session");
const { Validation, passwordFormatFn } = require("../util/validation-class");

async function postChangePassword(req, res) {
  const { email, password, confirmPassword } = req.body;
  const passwordFormat = passwordFormatFn(password);

  const existingUser = await Facebook.findUser({ email: email });
  const value = new Validation(
    null,
    null,
    password,
    confirmPassword,
    null,
    existingUser,
    email,
    passwordFormat
  );
  value.changePassword();

  if (Object.keys(value.message).length !== 0) {
    req.session.changePasswordData = {
      hasError: true,
      email: {
        value: email,
        message: value.message.email,
      },
      password: {
        value: password,
        message: value.message.password,
      },
      confirmPassword: {
        value: confirmPassword,
        message: value.message.confirmPassword,
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
