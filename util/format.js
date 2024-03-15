function format(currentUser) {
  const fullName = `${currentUser.firstName} ${currentUser.lastName}`;
  const today = new Date();
  const date = today.toLocaleDateString("en-US");
  return { fullName, date };
}

module.exports = format;
