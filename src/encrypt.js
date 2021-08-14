const CryptoJS = require("crypto-js");
const fs = require("fs");
let json = fs.readFileSync("data.json");
const { guests } = JSON.parse(json);
const encryptedData = {
  guests: guests.map((d) => ({
    id: CryptoJS.SHA256(d.secret).toString(),
    data: CryptoJS.AES.encrypt(
      JSON.stringify({ name: d.name }),
      d.secret
    ).toString(),
  })),
};
json = JSON.stringify(encryptedData, null, 2);
fs.writeFileSync("data_encrypted.json", json);
