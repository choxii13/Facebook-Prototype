const db = require("../data/database");
class Facebook {
  static async postDetails() {
    const postDetails = await db
      .getDb()
      .collection("post-detail")
      .find()
      .toArray();
    return postDetails;
  }
  static async findUser(data) {
    const user = await db.getDb().collection("users").findOne(data);
    return user;
  }

  static async insertData(collection, data) {
    const insertedData = await db
      .getDb()
      .collection(collection)
      .insertOne(data);
    return insertedData;
  }

  static async updateData(data, updatingData) {
    const insertedData = await db
      .getDb()
      .collection("users")
      .updateOne(data, { $set: updatingData });
    return insertedData;
  }
}

module.exports = Facebook;
