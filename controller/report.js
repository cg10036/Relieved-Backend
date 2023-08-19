const db = require("../db/db");

const getReport = (req, res) => {
  db.all("SELECT * FROM `report`", (err, rows) => {
    if (err) {
      return res.status(500).send("Interval Server Error");
    }
    // rows:
    // [
    //     {
    //         "id": 1, // Primary Key
    //         "lat": 37.57189607827978, // 위도
    //         "lng": 127.00823297863074, // 경도
    //         "detail": "test" // 신고 내용
    //     }
    // ]
    return res.json(rows);
  });
};

const setReport = (req, res) => {
  if (
    typeof req.body.lat !== "number" ||
    typeof req.body.lng !== "number" ||
    typeof req.body.detail !== "string"
  ) {
    return res.status(400).json({ reason: "WRONG_BODY_TYPE" });
  }

  db.run("INSERT INTO `report` (`lat`, `lng`, `detail`) VALUES (?, ?, ?)", [
    req.body.lat,
    req.body.lng,
    req.body.detail,
  ]);
  return res.status(201).send("");
};

module.exports = {
  getReport,
  setReport,
};
