function sessionAuth(req, res, existingUser, redirectTo) {
  req.session.uid = existingUser._id.toString();
  req.session.save(function () {
    res.redirect(redirectTo);
  });
}

function removeAuth(req, res, redirectTo) {
  req.session.uid = null;
  req.session.isAuth = null;
  res.redirect(redirectTo);
}

module.exports = { sessionAuth: sessionAuth, removeAuth: removeAuth };
