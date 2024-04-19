const PostImage = require("../model/post-image-model");
const User = require("../model/user-model");
async function postImage(req, res) {
  const posts = new PostImage(
    req.file.filename,
    res.locals.uid,
    req.body["post-detail"]
  );

  await posts.save();
  res.redirect("/facebook");
}

async function changeProfile(req, res) {
  const posts = new PostImage(req.file.filename, res.locals.uid);
  await User.updateUserProfile(res.locals.uid, req.file.filename);
  await posts.save();
  res.redirect("/facebook");
}

module.exports = { postImage: postImage, changeProfile: changeProfile };
