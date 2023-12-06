const express = require("express");
const router = express.Router();
const Student = require("../models/student");

// to create Student
router.post("/", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
