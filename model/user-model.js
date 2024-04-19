const db = require("../data/database");
const bcrypt = require("bcryptjs");
const mongoDb = require("mongodb");
class User {
  constructor(user) {
    this.email = user.email;
    this.password = user.password;
    this.confirmPassword = user.confirmPassword;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.birthdate = { day: user.day, month: user.month, year: user.year };
    this.gender = user.gender;
  }

  static userProfile(id) {
    const userId = new mongoDb.ObjectId(id);
    return db
      .getDb()
      .collection("users")
      .findOne(
        { _id: userId },
        { projection: { gender: 0, password: 0, email: 0, birthDate: 0 } }
      );
  }
  async save() {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    const existingUser = await this.getUserWithSameEmail();

    if (!existingUser) {
      return await db.getDb().collection("users").insertOne({
        email: this.email,
        password: hashedPassword,
        firstName: this.firstName,
        lastName: this.lastName,
        gender: this.gender,
        birthDate: this.birthdate,
        userProfile: "styles/main-facebook/images/no-profile.png",
      });
    }

    await db
      .getDb()
      .collection("users")
      .updateOne(
        { _id: existingUser._id },
        { $set: { ...existingUser, password: this.password } }
      );
  }

  getUserWithSameEmail() {
    return db.getDb().collection("users").findOne({ email: this.email });
  }

  async alreadyExists() {
    const existingUser = await this.getUserWithSameEmail();
    if (existingUser) {
      return true;
    }
    return false;
  }

  hasMatchingPassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }

  static updateUserProfile(id, image) {
    const userId = new mongoDb.ObjectId(id);
    return db
      .getDb()
      .collection("users")
      .updateOne({ _id: userId }, { $set: { userProfile: image } });
  }
}

module.exports = User;
