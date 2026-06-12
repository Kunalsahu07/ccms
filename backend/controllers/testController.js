const crypto = require('crypto');

const encryptionKey = "SAUW193BX628TD57";

function deriveKeyAndIV(password, salt) {
    let passwordBytes = Buffer.from(password, 'utf8');

    let hash = Buffer.alloc(0);
    let keyMaterial = Buffer.alloc(0);

    while (keyMaterial.length < 48) {
        hash = crypto
            .createHash('sha1')
            .update(Buffer.concat([hash, passwordBytes, salt]))
            .digest();

        keyMaterial = Buffer.concat([keyMaterial, hash]);
    }

    return {
        key: keyMaterial.slice(0, 32),
        iv: keyMaterial.slice(32, 48)
    };
}

function encryptPwd(inputText) {

    // C# => Encoding.ASCII.GetBytes(encryptionkey.Length.ToString())
    const salt = Buffer.from(
        encryptionKey.length.toString(),
        'ascii'
    );

    const { key, iv } = deriveKeyAndIV(encryptionKey, salt);

    // C# => Encoding.Unicode.GetBytes(inputText)
    const plainText = Buffer.from(inputText, 'utf16le');

    const cipher = crypto.createCipheriv(
        'aes-256-cbc',
        key,
        iv
    );

    let encrypted = cipher.update(plainText);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return encrypted.toString('base64');
}

function decryptPwd(encryptText) {

    const salt = Buffer.from(
        encryptionKey.length.toString(),
        'ascii'
    );

    const { key, iv } = deriveKeyAndIV(encryptionKey, salt);

    const encryptedData = Buffer.from(
        encryptText.replace(/ /g, '+'),
        'base64'
    );

    const decipher = crypto.createDecipheriv(
        'aes-256-cbc',
        key,
        iv
    );

    let decrypted = decipher.update(encryptedData);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    // C# Encoding.Unicode
    return decrypted.toString('utf16le');
}


// // TEST
// const original = "Hello123";

// const encrypted = encryptPwd(original);
// console.log("Encrypted:", encrypted);

// const decrypted = decryptPwd(encrypted);
// console.log("Decrypted:", decrypted);

async function handleUpdatePassword(req, res) {
    // const { password } = req.body;

    // const opass = decryptPwd(password);

    // console.log(opass);
    const original = "Hello123";

    const encrypted = encryptPwd(original);

    console.log("Encrypted:", encrypted);

    const decrypted = decryptPwd(encrypted);

    console.log("Decrypted:", decrypted);

}

module.exports = handleUpdatePassword;