const express = require("express");
const router = express.Router();

const students = require("../data/students");

// GET All Students
router.get("/", (req, res) => {
    res.json(students);
});

// GET Student by ID
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.json(student);
});

// POST Student
router.post("/", (req, res) => {

    const { name, branch, year } = req.body;

    if (!name || !branch || !year) {
        return res.status(400).json({
            message: "Please provide name, branch and year"
        });
    }

    const newStudent = {
        id: students.length + 1,
        name,
        branch,
        year
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });

});

// PUT Student
router.put("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, branch, year } = req.body;

    student.name = name || student.name;
    student.branch = branch || student.branch;
    student.year = year || student.year;

    res.json({
        message: "Student updated successfully",
        student
    });

});

// DELETE Student
router.delete("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    students.splice(index, 1);

    res.json({
        message: "Student deleted successfully"
    });

});

module.exports = router;