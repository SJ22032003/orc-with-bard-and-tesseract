const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./images");
  },
  filename: (req, res, cb) => {
    cb(null, res.fieldname + "-" + Date.now() + path.extname(res.originalname));
  },
});

const upload = multer({ storage: storage });

module.exports = upload;