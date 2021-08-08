const CryptoJS = require("crypto-js");
const fs = require("fs");
let json = fs.readFileSync("data.json");
const { data } = JSON.parse(json);
const encryptedData = {
  data: data.map((d) => ({
    id: CryptoJS.SHA256(d.secret).toString(),
    name: CryptoJS.AES.encrypt(d.name, d.secret).toString(),
  })),
};
json = JSON.stringify(encryptedData, null, 2);
fs.writeFileSync("data_encrypted.json", json);
