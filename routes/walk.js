const express = require("express");
const router = express.Router();

const { walk } = require("../controller/walk");

router.post("/", walk);

module.exports = router;
