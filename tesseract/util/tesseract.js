const path = require("path");
const loading = require("loading-cli");
const sanitizeTextData = require("./sanitizeTextData");
const { createWorker } = require("tesseract.js");

const config = {
  lang: "eng",
  tessedit_char_blacklist: '@#$^&*+|;:—",.<>?/\n',
  preserve_interword_spaces: 1,
  psm: 6,
  oem: 4,
  chop_enable: "1",
  user_words: ["Yes", "No", "Unkn", "NA", "✓"],
  tessedit_write_images: true,
  user_patterns: [
    {
      pattern: "Yes|No|Unkn|NA",
      name: "yes-no-unkn-na",
    },
    {
      pattern: "[0-9]+",
      name: "numbers",
    },
  ],
};

function extractDataUsingTesseractFromImage(imagePath) {
  const load = loading("Extracting data from image using Tesseract").start();
  return new Promise(async (resolve, reject) => {
    const worker = await createWorker("eng");
    try {
      const ret = await worker.recognize(
        path.resolve(__dirname, "../", imagePath),
        config
      );
      load.succeed("Data extracted successfully");
      const data  = sanitizeTextData(ret.data.text);
      resolve(data);
    } catch (err) {
      console.error(err);
      load.fail("Error in extracting data from image using Tesseract");
      reject("Error in extracting data from image using Tesseract");
    } finally {
      await worker.terminate();
      console.info("Tesseract terminated");
    }
  });
}

module.exports = extractDataUsingTesseractFromImage;
