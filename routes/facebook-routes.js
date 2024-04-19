const express = require("express");
const router = express.Router(); // express
const facebookController = require("../controller/facebook-controller");

router.get("/", facebookController.facebook);
router.get("/facebook", facebookController.getFacebook);

module.exports = router;
