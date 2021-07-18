# GENERAL

Headers:

- Ocp-Apim-Subscription-Key = key;
- Ocp-Apim-Subscription-Region = location;
- Content-type = application/jason;
- X-ClientTraceId = uuidv4().toString();

Params:

- api-version = 3.0;

Response Type: json;

## TRADUZIR

Method: POST;

Url: "/translate";

Params:

- from = idioma do texto;
- to = idioma da tradução;

Data:

- text = texto a ser traduzido;

## DETECTAR

Method: POST;

Url: "/detect";

data: text;
