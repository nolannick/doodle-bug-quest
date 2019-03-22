const pbkdf2 = require("pbkdf2");
const cryptoRandomString = require('crypto-random-string');

const generateSalt = function(){
    return cryptoRandomString(16);
}

const encrypt = function (password, salt) {
    const derivedKey = pbkdf2.pbkdf2Sync(password, salt, 1, 32, "sha512");
    return derivedKey.toString("hex");
}

module.exports = {
    encrypt,
    generateSalt
}