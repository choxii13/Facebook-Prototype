const express = require("express");
const router = express.Router();
const imageController = require("../controller/post-image-controller");
const configuredMulterMiddleware = require("../middleware/image-upload");

router.post(
  "/creating-post",
  configuredMulterMiddleware,
  imageController.postImage
);

router.post(
  "/changing-profile",
  configuredMulterMiddleware,
  imageController.changeProfile
);

module.exports = router;
