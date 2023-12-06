const express = require("express");
const router = express.Router();
const Mentor = require("../models/mentor");

// to create Mentor
router.post("/", async (req, res) => {
  try {
    const mentor = await Mentor.create(req.body);
    res.json(mentor);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
