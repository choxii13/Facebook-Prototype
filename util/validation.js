const passwordError =
  "A password must contain minimum eight characters, at least  one letter, one number and one special character";

function signup(user, existingUser) {
  const message = {};
  if (!user.firstName) {
    message.firstName = "What's your First Name?";
  }

  if (!user.lastName) {
    message.lastName = "What's your Last Name?";
  }

  if (!user.password || !passwordFormat(user.password)) {
    message.password = passwordError;
  }
  if (!confirmPass(passwordFormat(user.password), user.confirmPassword)) {
    message.confirmPassword = "Please input a correct password";
  }

  if (!user.gender) {
    message.gender = true;
  }

  if (!validEmail(user.email)) {
    message.email = "Please input a valid email";
  }

  if (existingUser) {
    message.email = "Email is already been used";
  }

  return message;
}

function changePassword(user, existingUser) {
  const message = {};
  if (!existingUser) {
    message.email = "This email does not exist";
  }
  if (!validEmail(user.email)) {
    message.email = "Please input a valid email";
  }
  if (!user.password || !passwordFormat(user.password)) {
    message.password = passwordError;
  }
  if (!confirmPass(passwordFormat(user.password), user.confirmPassword)) {
    message.confirmPassword = "Please input a correct password";
  }
  return message;
}

function login(passwordIsMatch, existingUser) {
  if (!existingUser) {
    return "Email does not exists";
  }
  if (!passwordIsMatch) {
    return "Incorrect email or password";
  }
}

function confirmPass(password, confirmPassword) {
  return password === confirmPassword || confirmPassword;
}

function passwordFormat(password) {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(password);
}

function validEmail(email) {
  return email || email.endsWith("@gmail.com");
}

module.exports = {
  signup: signup,
  changePassword: changePassword,
  login: login,
};
