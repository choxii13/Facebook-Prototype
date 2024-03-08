const express = require("express");
const db = require("../data/database");
const router = express.Router();
const multer = require("multer");
const validation = require("../util/validation");
const storageConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "image_upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storageConfig });

router.post(
  "/facebook/creating-post",
  upload.single("image"),
  async function (req, res) {
    const imageFile = req.file;
    const postContent = req.body["post-detail"];
    const sessionUser = await db
      .getDb()
      .collection("users")
      .findOne({ email: req.session.user });
    const fullName = `${sessionUser.firstName} ${sessionUser.lastName}`;

    const today = new Date();
    const date = today.toLocaleDateString("en-US");
    console.log(date);
    await db.getDb().collection("post-detail").insertOne({
      date: date,
      email: req.session.user,
      name: fullName,
      content: postContent,
      imagePath: imageFile.path,
    });
    res.redirect("/facebook");
  }
);

module.exports = router;
