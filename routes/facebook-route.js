const express = require("express");
const router = express.Router(); // express

const multerConfig = require("../config/multer-config");
const upload = multerConfig(); // multer

const facebookController = require("../controller/facebook-controller");
const postImageController = require("../controller/post-image-controller");
const changePasswordController = require("../controller/change-password-controller");
const authController = require("../controller/auth-controller"); // routes controller

router.get("/facebook", facebookController);
router.post(
  "/facebook/creating-post",
  upload.single("image"),
  postImageController
);

router.post("/change-password", changePasswordController);
router.post("/sign-up", authController.postSignUp);
router.post("/login", authController.postLogin);

router.post("/logout", function (req, res) {
  req.session.isAuthenticated = false;
  res.redirect("/facebook");
});

module.exports = router;
