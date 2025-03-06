import { randomBytes } from "crypto";

randomBytes(32, (err, buffer) => {
  if (err) {
    console.error(err);
    return;
  }
  const key = buffer.toString("base64");
  console.log(key);
});
