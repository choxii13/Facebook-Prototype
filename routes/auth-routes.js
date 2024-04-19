const express = require("express");
const router = express.Router(); // express
const authController = require("../controller/auth-controller");

router.post("/sign-up", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/change-password", authController.changePassword);

module.exports = router;
