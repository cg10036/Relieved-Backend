const express = require("express");
const router = express.Router();

const { mailbox } = require("../controller/mailbox");

router.post("/", mailbox);

module.exports = router;
