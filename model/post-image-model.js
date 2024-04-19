const db = require("../data/database");
const Mongodb = require("mongodb");
const User = require("./user-model");
class PostImage {
  constructor(image, id, content) {
    this.content = content;
    this.date = new Date();
    this.newDate = this.date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    this.image = image;
    this.id = id;
  }

  async save() {
    const userId = new Mongodb.ObjectId(this.id);
    const user = await User.userProfile(userId);

    if (this.content) {
      await db
        .getDb()
        .collection("post-detail")
        .insertOne({
          fullName: user.firstName + " " + user.lastName,
          userProfile: user.userProfile,
          userId: userId,
          content: this.content,
          image: this.image,
          date: this.newDate,
        });
      return;
    }

    await db
      .getDb()
      .collection("post-detail")
      .updateMany(
        { userId: userId },
        {
          $set: {
            userProfile: user.userProfile,
          },
        }
      );
  }

  static findAll() {
    return db
      .getDb()
      .collection("post-detail")
      .find()
      .sort({ _id: -1 })
      .toArray();
  }
}

module.exports = PostImage;
