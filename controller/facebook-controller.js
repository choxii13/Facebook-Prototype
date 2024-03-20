const Facebook = require("../model/facebook-model");
const { leftSection, days, months, years } = require("../util/data");
const { sessionDefaultValue } = require("../util/validation-session");

async function getFacebook(req, res) {
  if (res.locals.isAuth) {
    const postDetails = await Facebook.postDetails();
    postDetails.reverse();
    res.render("facebook", {
      postDetails: postDetails,
      leftSection,
    });
    return;
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

  res.render("facebook", {
    date: { days, months, years },
    inputData: signUpData,
    success: success,
    changePassword: changePasswordData,
    loginFacebook,
  });

  // csrfToken,

  //   const csrfToken = req.csrfToken();
}

module.exports = getFacebook;
