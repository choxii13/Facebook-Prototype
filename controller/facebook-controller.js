const Facebook = require("../model/facebook-model");
const { leftSection, days, months, years } = require("../util/data");
const { sessionDefaultValue } = require("../util/validation-session");

async function getFacebook(req, res) {
  if (req.session.isAuthenticated) {
    const postDetails = await Facebook.postDetails();
    const user = await Facebook.findUser({ email: req.session.user });
    postDetails.reverse();
    console.log(user);
    return res.render("main-facebook", {
      postDetails: postDetails,
      leftSection,
      user: user,
    });
  }

  let signUpData = req.session.signUpData;
  let success = req.session.success;
  let changePasswordData = req.session.changePasswordData;
  let loginFacebook = req.session.loginFacebook;

  if (!loginFacebook) {
    loginFacebook = sessionDefaultValue(req);
  }

  if (!changePasswordData) {
    changePasswordData = sessionDefaultValue(req);
  }

  if (!signUpData) {
    signUpData = sessionDefaultValue(req);
  }

  //   const csrfToken = req.csrfToken();
  res.render("login-facebook", {
    date: { days, months, years },
    inputData: signUpData,
    success: success,
    changePassword: changePasswordData,
    loginFacebook,
    // csrfToken,
  });
}

module.exports = getFacebook;
