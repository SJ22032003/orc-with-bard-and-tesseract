const express = require("express");
const path = require("path");
require("dotenv").config();
const upload = require("./util/multer");
const extractDataUsingBardFromImage = require("./util/bard");

const PORT = process.env.PORT || 8000;

const app = express();


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname + "/images")));


app.get("/", (req, res) => {
  res.render("index", { data: "" });
});

app.post("/extract-img", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.render("index", { data: "Please select an image" });
  }
  const data = await extractDataUsingBardFromImage(req.file.path);
  res.render("index", { data });
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
