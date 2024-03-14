function validationSignUp(inputData, password, passwordFormat, existingUser) {
  const { firstName, lastName, email, confirmPassword, gender } = inputData;
  return (
    firstName &&
    lastName &&
    email &&
    email.endsWith("@gmail.com") &&
    password &&
    !existingUser &&
    passwordFormat &&
    confirmPassword &&
    password === confirmPassword &&
    gender
  );
}

function validationChangePassword(
  email,
  password,
  passwordFormat,
  confirmPassword,
  existingUser
) {
  return (
    email ||
    email.endsWith("@gmail.com") ||
    password ||
    passwordFormat ||
    confirmPassword ||
    password !== confirmPassword ||
    existingUser
  );
}

function passwordFormatFn(password) {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(password);
}

module.exports = {
  validationSignUp,
  validationChangePassword,
  passwordFormatFn,
};
