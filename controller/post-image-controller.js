const Facebook = require("../model/facebook-model");
const format = require("../util/format");
const fs = require("fs-extra");
async function postImageController(req, res) {
  const currentUser = await Facebook.findUser({ email: req.session.user });
  const { fullName, date } = format(currentUser);

  await Facebook.insertData("post-detail", {
    date: date,
    email: req.session.user,
    name: fullName,
    content: req.body["post-detail"],
    imagePath: req.file.path,
    profilePicture: currentUser.imagePath,
  });

  res.redirect("/facebook");
}

async function postChangeProfilePicture(req, res) {
  const currentUser = await Facebook.findUser({ email: req.session.user });
  await Facebook.updateData(
    { email: req.session.user },
    {
      imagePath: req.file.path,
    }
  );

  if ("styles/main-facebook/images/no-profile.svg" !== currentUser.imagePath) {
    await fs.remove(currentUser.imagePath);
  }
  res.redirect("/facebook");
}

module.exports = { postImageController, postChangeProfilePicture };
