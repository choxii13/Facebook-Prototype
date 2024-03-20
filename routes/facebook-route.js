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

router.post("/facebook/sign-up", authController.postSignUp);
router.post("/facebook/login", authController.postLogin);
router.post("/facebook/logout", authController.postLogOut);

router.use(guardAuthRoutes);

// facebook Controller
router.get("/facebook", facebookController);

router.post("/change-password", changePasswordController);

// auth -controller

// posting and change picture
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

// router.use(error500);
// router.use(error404);

module.exports = router;
