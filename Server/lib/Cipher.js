const crypto = require("crypto");

class Cipher {
  constructor(algo, keyBytes, ivBytes, byteType) {
    this._algorithm = algo;
    this._key = Buffer.from(keyBytes, byteType);
    this._iv = Buffer.from(ivBytes, byteType);
    this._byteType = byteType;
  }

  encrypt(text) {
    // Creating Cipheriv with its parameter
    let cipher = crypto.createCipheriv(
      this._algorithm,
      Buffer.from(this._key),
      this._iv
    );

    // Updating text
    let encrypted = cipher.update(text);

    // Using concatenation
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    // Returning iv and encrypted data
    return encrypted.toString(this._byteType);
  }

  decrypt(text) {
    let encryptedText = Buffer.from(text, this._byteType);

    // Creating Decipher
    let decipher = crypto.createDecipheriv(
      this._algorithm,
      Buffer.from(this._key),
      this._iv
    );

    // Updating encrypted text
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    // returns data after decryption
    return decrypted.toString();
  }
}

module.exports = Cipher;
