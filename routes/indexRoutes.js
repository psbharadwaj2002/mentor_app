const express = require("express");
const path = require("path");
const mentorRoutes = require("./mentorRoutes");
const studentRoutes = require("./studentRoutes");
const assignRoutes = require("./assignRoutes");

const router = express.Router();

router.use("/mentor", mentorRoutes);
router.use("/student", studentRoutes);
router.use("/assign", assignRoutes);

module.exports = router;
