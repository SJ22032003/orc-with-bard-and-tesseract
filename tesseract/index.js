const path = require("path");
const express = require("express");
const extractDataUsingTesseractFromImage = require("./util/tesseract");
const upload = require("./util/multer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8082;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname + "/images")));

app.get("/", (req, res) => {
  res.render("index", { data: "" });
});

app.post("/extract-img-orc", upload.single("file"), async (req, res) => {
  if(!req.file) {
    return res.render("index", { data: "Please select an image" });
  }
  const data = await extractDataUsingTesseractFromImage(req.file.path);
  res.render("index", { data });
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
