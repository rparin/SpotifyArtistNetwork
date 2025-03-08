/* eslint-disable @typescript-eslint/no-require-imports */
const crypto = require("crypto");
/* eslint-enable @typescript-eslint/no-require-imports */

crypto.randomBytes(32, (err, buffer) => {
  if (err) {
    console.error(err);
    return;
  }
  const key = buffer.toString("base64");
  console.log(key);
});
