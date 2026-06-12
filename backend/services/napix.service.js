const axios = require('axios');
const crypto = require('crypto');

const BASE_URL = 'https://delhigw.napix.gov.in/nic/ecourts/';
const TOKEN_URL = 'https://delhigw.napix.gov.in/nic/ecourts//oauth2/token';

// ─── Config (from your Web.config AppSettings) ───────────────
NAPIX_API_KEY = "c340e71880d8925bb442a6958c7dfbd7";
NAPIX_SECRET_KEY = "ca4d08fed641b24c0c62675d5c8b8823";
NAPIX_IV_STRING = "rl6uixNNGvoDMe5q";
NAPIX_DEPT_ID = "cg-forest";
NAPIX_VERSION = "v1.0";
NAPIX_SECRET_KEY_HMAC = "15081947";   // secretKey (for HMAC)
NAPIX_AUTH_KEY = "rl6uixNNGvoDMe5q";           // authenticationKey (for AES)
NAPIX_EST_CODE = "CGHC01";


function hashHmac(reqString) {
    return crypto
        .createHmac('sha256', Buffer.from(NAPIX_SECRET_KEY_HMAC, 'ascii'))
        .update(Buffer.from(reqString, 'utf8'))
        .digest('hex');
}

function encryptString(inputStr) {
    const key = Buffer.alloc(16);
    Buffer.from(NAPIX_AUTH_KEY, 'ascii').copy(key);
    const iv = Buffer.alloc(16);
    Buffer.from(NAPIX_AUTH_KEY, 'ascii').copy(iv);

    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    const encrypted = Buffer.concat([cipher.update(inputStr, 'utf8'), cipher.final()]);
    return encrypted.toString('base64');
}

function decryptString(base64Ciphertext) {
    if (!base64Ciphertext) return null;

    const key = Buffer.alloc(16);
    Buffer.from(NAPIX_AUTH_KEY, 'ascii').copy(key);
    const iv = Buffer.alloc(16);
    Buffer.from(NAPIX_IV_STRING, 'ascii').copy(iv);

    const decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(base64Ciphertext, 'base64')),
        decipher.final(),
    ]);
    return decrypted.toString('utf8');
}

async function getAccessToken() {
    const combineKey = `${NAPIX_API_KEY}:${NAPIX_SECRET_KEY}`;
    const basicAuth = Buffer.from(combineKey).toString('base64');

    const response = await axios.post(
        TOKEN_URL,
        'grant_type=client_credentials&scope=napix',
        {
            headers: {
                'Authorization': `Basic ${basicAuth}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    );
    return response.data.access_token;
}

async function callNapixApi(apiName, requestStr) {
    const accessToken = await getAccessToken();
    const requestToken = hashHmac(requestStr);
    const encryptedStr = encodeURIComponent(encryptString(requestStr));

    const url = `${BASE_URL}${apiName}?dept_id=${NAPIX_DEPT_ID}&request_str=${encryptedStr}&request_token=${requestToken}&version=${NAPIX_VERSION}`;
    console.log('Raw request string:', requestStr); 
    console.log('Final URL:', url);                 
    const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });

    const responseStr = response.data?.response_str;
    if (!responseStr) return null;
    return decryptString(responseStr);
}

async function searchCase({ estCode, caseType, regNo, regYear }) {
    const requestStr = `est_code=${estCode}|case_type=${caseType}|reg_no=${regNo}|reg_year=${regYear}`;
    const raw = await callNapixApi('hc-case-search-api/casesearch', requestStr); // ✅ fixed
    return raw ? JSON.parse(raw) : null;
}

async function getCnrDetails(cino) {
    return callNapixApi('hc-cnr-api', `cino=${cino}`);
}

module.exports = { searchCase, callNapixApi, getCnrDetails };