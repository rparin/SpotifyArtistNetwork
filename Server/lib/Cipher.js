const crypto = require("crypto");

class Cipher {
  constructor(algo, keyBytes, ivBytes) {
    this._algorithm = algo; //const algorithm = 'REDACTED
    this._key = crypto.randomBytes(keyBytes); //const key = REDACTED
    this._iv = crypto.randomBytes(ivBytes); //const iv = REDACTED
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
    // return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
    return encrypted.toString("hex");
  }

  decrypt(text) {
    let encryptedText = Buffer.from(text, "hex");

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
