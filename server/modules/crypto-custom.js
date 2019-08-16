const CryptoJS = require('crypto-js');
const { aesKey: secretKey } = require('../config');

const crypto = {
	enc(str) {
		const encryptedObj = CryptoJS.AES.encrypt(str, secretKey);
		const encrypted = encryptedObj.toString();
		return encrypted;
	},
	dec(encrypted) {
		const decryptedObj = CryptoJS.AES.decrypt(encrypted, secretKey);
		const decrypted = decryptedObj.toString(CryptoJS.enc.Utf8);
		return decrypted;
	},
};

module.exports = crypto;
