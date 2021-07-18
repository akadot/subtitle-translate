const axios = require("axios").default;
const { v4: uuidv4 } = require("uuid");

var subscriptionKey = "b919b9a51c6a4d62b2b9ab578dae9b76";
var endpoint = "https://api.cognitive.microsofttranslator.com";

// Add your location, also known as region. The default is global.
// This is required if using a Cognitive Services resource.
var location = "global";

axios({
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
    from: "en",
    to: ["de", "it"],
  },
  data: [
    {
      text: "Hello World!",
    },
  ],
  responseType: "json",
}).then(function (response) {
  console.log(JSON.stringify(response.data, null, 4));
});
