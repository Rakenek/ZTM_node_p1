const express = require("express");
const { getAllLaunches } = require("./launches.controller");

const router = express.Router();

router.get("/", getAllLaunches);

module.exports = router;
