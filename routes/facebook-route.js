const express = require("express");
const router = express.Router(); // express
const multerConfig = require("../config/multer-config");
const upload = multerConfig(); // multer
const facebookController = require("../controller/facebook-controller");
const imageController = require("../controller/post-image-controller");
const changePasswordController = require("../controller/change-password-controller");
const authController = require("../controller/auth-controller"); // routes controller
const {
  guardAuthRoutes,
  error500,
  error404,
} = require("../middleware/middleware-routes");

router.post("/sign-up", authController.postSignUp);
router.post("/login", authController.postLogin);
router.post("/logout", authController.postLogOut);
router.post("/change-password", changePasswordController);

router.use(guardAuthRoutes);
router.get("/", facebookController);
// facebook Controller

// auth -controller

// posting and change picture
router.post(
  "/creating-post",
  upload.single("image"),
  imageController.postImageController
);

router.post(
  "/creating-profile-picture",
  upload.single("image"),
  imageController.postChangeProfilePicture
);

// router.use(error500);
// router.use(error404);

module.exports = router;
