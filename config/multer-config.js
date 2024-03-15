const multer = require("multer");
function multerConfig() {
  const storageConfig = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "image_upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  const upload = multer({ storage: storageConfig });
  return upload;
}

module.exports = multerConfig;
