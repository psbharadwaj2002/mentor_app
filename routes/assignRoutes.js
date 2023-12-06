const express = require("express");
const router = express.Router();
const path = require("path");
const Mentor = require(path.resolve(__dirname, "../models/mentor"));
const Student = require(path.resolve(__dirname, "../models/student"));
// to assign a student to Mentor
router.post("/", async (req, res) => {
  try {
    const { mentorId, studentId } = req.body;
    const mentor = await Mentor.findByIdAndUpdate(
      mentorId,
      { $push: { students: studentId } },
      { new: true }
    ).populate("students");

    const student = await Student.findByIdAndUpdate(
      studentId,
      { mentor: mentorId },
      { new: true }
    );

    res.json({ mentor, student });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// to assign or Change Mentor for particular Student
router.put("/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const { mentorId } = req.body;

    const student = await Student.findByIdAndUpdate(
      studentId,
      { mentor: mentorId },
      { new: true }
    );

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// to show all students for a particular mentor
router.get("/mentor-students/:mentorId", async (req, res) => {
  try {
    const { mentorId } = req.params;
    const mentor = await Mentor.findById(mentorId).populate("students");
    res.json(mentor.students);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// to show the previously assigned mentor for a particular student
router.get("/student-mentor/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).populate("mentor");
    res.json(student.mentor);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
