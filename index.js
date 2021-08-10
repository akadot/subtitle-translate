require("dotenv").config();
const axios = require("axios").default;
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

var subscriptionKey = process.env.SECRET_KEY;
var location = process.env.LOCATION;
var endpoint = "https://api.cognitive.microsofttranslator.com";

const selectedLang = "en";
const translatedLang = "pt";

async function generateTranslation() {
  const subFile = await convertFile();
  const newFile = await translateFile(subFile, selectedLang, translatedLang);
  await writeNewFile(newFile);
}

generateTranslation();

async function convertFile() {
  const file = fs.readFileSync("./testSub.srt").toString().slice(0, 400);
  return file;
}

async function writeNewFile(file) {
  if (!fs.existsSync("./newFile.srt")) {
    const writeFile = fs.createWriteStream("newFile.srt");
    writeFile.write(file);
    writeFile.close();
  } else {
    console.log("File Already Exists.");
  }
}

// async function detectLang(file) {
//   const detectedLang = await axios({
//     baseURL: endpoint,
//     url: "/detect",
//     method: "post",
//     headers: {
//       "Ocp-Apim-Subscription-Key": subscriptionKey,
//       "Ocp-Apim-Subscription-Region": location,
//       "Content-type": "application/json",
//       "X-ClientTraceId": uuidv4().toString(),
//     },
//     params: {
//       "api-version": "3.0",
//     },
//     data: [
//       {
//         text: file,
//       },
//     ],
//     responseType: "json",
//   }).then(function (response) {
//     // console.log(JSON.stringify(response.data[0].language));
//     return JSON.stringify(response.data[0].language);
//   });
//   return detectedLang;
// }

async function translateFile(file, selectedlang, translatedLang) {
  const translatedString = await axios({
    baseURL: endpoint,
    url: "/translate",
    method: "post",
    headers: {
      "Ocp-Apim-Subscription-Key": subscriptionKey,
      "Ocp-Apim-Subscription-Region": location,
      "Content-type": "application/json",
      "X-ClientTraceId": uuidv4().toString(),
    },
    params: {
      "api-version": "3.0",
      from: selectedlang,
      to: translatedLang,
    },
    data: [
      {
        text: file,
      },
    ],
    responseType: "json",
  }).then(function (response) {
    // console.log(JSON.stringify(response.data[0].translations[0].text));
    return JSON.stringify(response.data[0].translations[0].text);
  });
  return translatedString;
}
