const PostImage = require("../model/post-image-model");
const User = require("../model/user-model");
const { leftSection, days, months, years } = require("../util/data");
const { sessionDefaultValue } = require("../util/validation-session");

function facebook(req, res) {
  res.redirect("/facebook");
}
async function getFacebook(req, res) {
  if (res.locals.isAuth) {
    const postDetails = await PostImage.findAll();
    const userProfile = await User.userProfile(req.session.uid);
    console.log(req.session.uid);
    res.render("./facebook/main-facebook", {
      postDetails: postDetails,
      userProfile: userProfile,
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

  res.render("./login-facebook/facebook", {
    date: { days, months, years },
    inputData: signUpData,
    success: success,
    changePassword: changePasswordData,
    loginFacebook,
  });
}

module.exports = { facebook: facebook, getFacebook: getFacebook };
