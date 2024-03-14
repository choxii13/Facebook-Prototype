const Facebook = require("../model/facebook-model");

async function postImageController(req, res) {
  const imageFile = req.file;
  const postContent = req.body["post-detail"];

  const currentUser = await Facebook.findUser({ email: req.session.user });

  const fullName = `${currentUser.firstName} ${currentUser.lastName}`;
  const today = new Date();
  const date = today.toLocaleDateString("en-US");

  await Facebook.insertData("post-detail", {
    date: date,
    email: req.session.user,
    name: fullName,
    content: postContent,
    imagePath: imageFile.path,
  });

  res.redirect("/facebook");
}

module.exports = postImageController;
