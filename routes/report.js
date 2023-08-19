const express = require("express");
const router = express.Router();

const { getReport, setReport } = require("../controller/report");

router.get("/", getReport);
router.post("/", setReport);

module.exports = router;
