const express = require("express");
const router = express.Router();

const ping = require("./ping");
const walk = require("./walk");

router.use("/ping", ping);
router.use("/walk", walk);

module.exports = router;
