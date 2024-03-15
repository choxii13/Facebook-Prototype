class Validation {
  constructor(
    firstName,
    lastName,
    password,
    confirmPassword,
    gender,
    existingUser,
    email,
    passwordFormat
  ) {
    this.message = {};
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.passwordFormat = passwordFormat;
    this.existingUser = existingUser;
    this.email = email;
  }

  SignUp() {
    if (!this.firstName) {
      this.message.firstName = "What's your First Name?";
    }
    if (!this.lastName) {
      this.message.lastName = "What's your Last Name?";
    }
    if (!this.password || !this.passwordFormat) {
      this.message.password =
        "A password must contain minimum eight characters, at least  one letter, one number and one special character";
    }

    if (this.password !== this.confirmPassword || !this.confirmPassword) {
      this.message.confirmPassword = "Please input a correct password";
    }

    if (!this.gender) {
      this.message.gender = true;
    }

    if (!this.email || !this.email.endsWith("@gmail.com")) {
      this.message.email = "Please input a valid email";
    }

    if (this.existingUser) {
      this.message.email = "Email is already been used";
    }
  }

  changePassword() {
    if (!this.existingUser) {
      this.message.email = "This email does not exist";
    }
    if (!this.email || !this.email.endsWith("@gmail.com")) {
      this.message.email = "Please input a valid email";
    }
    if (!this.password || !this.passwordFormat) {
      this.message.password =
        "A password must contain minimum eight characters, at least  one letter, one number and one special character";
    }
    if (this.password !== this.confirmPassword || !this.confirmPassword) {
      this.message.confirmPassword = "Please input a correct password";
    }
  }

  static logIn(passwordIsMatch, existingUser) {
    if (!existingUser) {
      return "This Email does not exist";
    }
    if (!passwordIsMatch) {
      return "Incorrect Email or Password";
    }
  }
}

// fast but not reusable code

function passwordFormatFn(password) {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(password);
}

module.exports = { Validation, passwordFormatFn };
