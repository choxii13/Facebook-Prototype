// for front-end messages
const validationMessage = {
  firstName: (firstNameEntered) => {
    if (!firstNameEntered) {
      return "What's your First Name?";
    }
  },
  lastName: (lastNameEntered) => {
    if (!lastNameEntered) {
      return "What's your Last Name?";
    }
  },
  emailSignUp: (emailEntered, existingEmail) => {
    if (!emailEntered.endsWith("@gmail.com") || !emailEntered) {
      return "Please input a valid email";
    }
    if (existingEmail) {
      return "Email is already been used";
    }
  },
  emailLogin: (existingUser, passwordIsMatch) => {
    if (!existingUser) {
      return "Email does not exist";
    }
    if (!passwordIsMatch) {
      return "Incorrect Email or Password";
    }
  },
  emailChangePassword: (emailEntered, existingEmail) => {
    if (!emailEntered.endsWith("@gmail.com") || !emailEntered) {
      return "Please input a valid email";
    }
    if (!existingEmail) {
      return "This email does not exist ";
    }
  },
  password: (passwordEntered, passwordFormat) => {
    if (!passwordFormat || !passwordEntered) {
      return "A password must contain minimum eight characters, at least  one letter, one number and one special character";
    }
  },
  confirmPassword: (passwordEntered, confirmPassword) => {
    if (passwordEntered !== confirmPassword || !confirmPassword) {
      return "Please input a correct password";
    }
  },
  gender: (gender) => {
    if (!gender) {
      return true;
    }
  },
};

module.exports = validationMessage;
