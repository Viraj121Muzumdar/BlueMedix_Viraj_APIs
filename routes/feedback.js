const express = require("express");
const router = express.Router();
const data = require("../db/data.json");

router.post("/submit", (req, res) => {
  const feedback = req.body;
  data.feedback.push(feedback);
  res.status(201).json({ message: "Feedback submitted", feedback });
});

router.get("/list", (req, res) => res.json(data.feedback));

module.exports = router;
