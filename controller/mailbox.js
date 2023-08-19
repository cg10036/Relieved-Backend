const fs = require("fs");

const jsonData = JSON.parse(fs.readFileSync("mailbox.json"));
const placesData = jsonData.DATA;

const mailbox = (req, res) => {
  return res.json(placesData);
};

module.exports = {
  mailbox,
};
