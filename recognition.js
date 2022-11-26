require('dotenv').config();
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const {
    TOKEN_URL,
    RECOGN_URL,
    OAUTH,
    FOLDER_ID,
} = process.env;

async function getIAMTokenReq(url = TOKEN_URL, auth = OAUTH) {
    const response = await fetch(`${url}`, {
        method: `POST`,
        headers: {
            'Content-Type': `application/json`
        },
        body: `{
             "yandexPassportOauthToken":"${auth}" 
            }`
    })
    const body = await response.json();

    return body.iamToken;
}

async function postYandexRecognition(token, encoded, url = RECOGN_URL, folderID = FOLDER_ID) {
    const response = await fetch(`${url}`, {
        method: `POST`,
        headers: {
            'authorization': `Bearer ${token}`,
            'Content-Type': `application/json`
        },
        body: `{
               "folderId": "${folderID}",
               "analyze_specs": [{
                   "content": "${encoded}",
                   "features": [{
                       "type": "TEXT_DETECTION",
                       "text_detection_config": {
                           "language_codes": ["*"]
                       }
                   }]
               }]
           }`
    })
    return await response.text();
}

module.exports = async function (encoded) {
    const token = await getIAMTokenReq();

    const text = await postYandexRecognition(token, encoded);
    return text;
};