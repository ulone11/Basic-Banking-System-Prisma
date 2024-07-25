var express = require("express");
var router = express.Router();
const API_ROUTER = require("./api");

router.use("/api", API_ROUTER);

module.exports = router;
