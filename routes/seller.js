const express = require("express");
const router = express.Router();
const data = require("../db/data.json");

router.post("/add", (req, res) => {
  const seller = req.body;
  data.sellers.push(seller);
  res.status(201).json({ message: "Seller added", seller });
});

router.get("/list", (req, res) => res.json(data.sellers));

module.exports = router;
