const express = require("express");

const app = express();

const PORT = 3000;

app.use(express.json());

const studentRoutes = require("./routes/students");

app.use("/students", studentRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to DecodeLabs Project 2 Backend API");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});