const Facebook = require("../model/facebook-model");
const format = require("../util/format");
async function postImageController(req, res) {
  const currentUser = await Facebook.findUser({ email: req.session.user });
  const { fullName, date } = format(currentUser);

  await Facebook.insertData("post-detail", {
    date: date,
    email: req.session.user,
    name: fullName,
    content: req.body["post-detail"],
    imagePath: req.file.path,
  });

  res.redirect("/facebook");
}

module.exports = postImageController;
