const express = require("express");
const router = express.Router();

router.use("/lojas", require("./lojas"));
router.use("/veiculos", require("./veiculos"));
router.use("/", require("./auth"));
router.use("/geocode", require("./geocode"));

module.exports = router;
