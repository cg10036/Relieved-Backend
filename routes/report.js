const express = require("express");
const router = express.Router();

const { report } = require("../controller/report");

router.get("/", report);

module.exports = router;
