const loading = require("loading-cli");
const fs = require("fs");
const path = require("path");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");
const { inputPrompt, outputPrompt } = require("../prompts");

const MODEL_NAME = process.env.MODEL_NAME;
const API_KEY = process.env.API_KEY;

async function extractDataUsingBardFromImage(imagePath) {
  if (!imagePath) {
    console.error("imagePath is required");
    return;
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.4,
    topK: 32,
    topP: 1,
    maxOutputTokens: 4096,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: "BLOCK_NONE",
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: "BLOCK_NONE",
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: "BLOCK_NONE",
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: "BLOCK_NONE",
    },
  ];

  const parts = [
    { text: inputPrompt },
    { text: outputPrompt },
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: Buffer.from(
          fs.readFileSync(path.resolve(__dirname, "../", imagePath))
        ).toString("base64"),
      },
    },
  ];

  // generate content -- start loading
  const load = loading("Generating content").start();

  // generate content
  let response;
  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });
    response = result.response;
    console.log(response.text(), "RESPONSE");
  } catch (error) {
    console.error(error.message);
    load.fail("Error generating content").stop();
    return [{ question_no: "error", answer: error.message }]
  }


  // create a json file with the response and log it to console
  const out = JSON.parse(response.text());
  fs.writeFileSync("output.json", JSON.stringify(out));

  // stop loading
  load.succeed("\nGenerated content").stop();

  return out;
}

module.exports = extractDataUsingBardFromImage;
