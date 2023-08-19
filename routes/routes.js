const express = require("express");
const router = express.Router();

const ping = require("./ping");
const walk = require("./walk");
const mailbox = require("./mailbox");

router.use("/ping", ping);
router.use("/walk", walk);
router.use("/mailbox", mailbox);

module.exports = router;
