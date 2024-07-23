const Student = require("../models/student.js");

// Student signup [By Shreya] [fixes all Errors]
exports.StudentSignup = async (req, res) => {
  const newStudent = new Student(req.body);
  try {
    const find = await Student.findOne({ UserName: req.body.UserName });
    if (find) {
      return res.status(400).json({ message: "Student already registered" });
    }
    await newStudent.save();
    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//Show All Students From Students Collection [By Ishita] /* NEW */

exports.ValidateStudent = async (req, res) => {
  try {
    const user = await Student.find();
    if (user.length === 0) {
      return res.status(404).json({ message: 'No Students found' });
    } 
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// shreya 
    exports.ValidateClassSec = async (req, res) => {
  try {
      const { Class, Section } = req.body;

      // Validate input
      if (!Class || !Section) {
          return res.status(400).json({ error: 'Class and section are required' });
      }

      const students = await Student.find({Class, Section });

      if (students.length === 0) {
          return res.status(404).json({ message: 'No students found for the given class and section' });
      }

      res.status(200).json(students);
  } catch (err) {
      res.status(500).json({ error: 'Server error'});
    }
};