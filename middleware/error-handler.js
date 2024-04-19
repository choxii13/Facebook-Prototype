function error500(error, req, res, next) {
  console.log(error);
  res.status(500).render("./shared/500");
}

function error404(req, res) {
  res.render("./shared/404");
}

module.exports = { error500: error500, error404: error404 };
