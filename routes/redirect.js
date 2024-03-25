const express = require("express");
const router = express.Router(); // express

router.get("/", function (req, res) {
  res.redirect("/facebook");
});

module.exports = router;
