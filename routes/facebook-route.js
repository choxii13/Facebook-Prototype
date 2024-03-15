const express = require("express");
const router = express.Router(); // express

const multerConfig = require("../config/multer-config");
const upload = multerConfig(); // multer
const facebookController = require("../controller/facebook-controller");
const imageController = require("../controller/post-image-controller");
const changePasswordController = require("../controller/change-password-controller");
const authController = require("../controller/auth-controller"); // routes controller

router.get("/facebook", facebookController);

router.post(
  "/facebook/creating-post",
  upload.single("image"),
  imageController.postImageController
);
router.post(
  "/facebook/creating-profile-picture",
  upload.single("image"),
  imageController.postChangeProfilePicture
);

router.post("/change-password", changePasswordController);
router.post("/sign-up", authController.postSignUp);
router.post("/login", authController.postLogin);

router.post("/logout", function (req, res) {
  req.session.user = null;
  req.session.isAuthenticated = false;
  res.redirect("/facebook"); // for extra purpose
});

// router.use(function (error, req, res, next) {
//   res.render("500");
// });

// router.use(function (req, res) {
//   res.render("404");
// });

module.exports = router;
