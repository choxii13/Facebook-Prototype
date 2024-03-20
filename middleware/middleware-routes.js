const Facebook = require("../model/facebook-model");

async function guardAuthRoutes(req, res, next) {
  const isAuth = req.session.isAuthenticated;
  const user = req.session.user;
  if (!isAuth || !user) {
    next();
  }

  const currentUser = await Facebook.findUser({ email: user });
  console.log(currentUser);
  res.locals.curUser = currentUser;
  res.locals.isAuth = isAuth;
  next();
}

function error500(error, req, res, next) {
  res.render("500");
}

function error404(req, res) {
  res.render("404");
}

module.exports = { guardAuthRoutes, error500, error404 };
