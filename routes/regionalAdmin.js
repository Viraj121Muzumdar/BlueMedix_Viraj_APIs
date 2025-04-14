const express = require("express");
const router = express.Router();
const data = require("../db/data.json");

router.get("/sellers", (req, res) => {
  const regionalSellers = data.sellers.filter(s => s.region === req.query.region);
  res.json(regionalSellers);
});

router.put("/approve/:id", (req, res) => {
  const seller = data.sellers.find(s => s.id === parseInt(req.params.id));
  if (!seller) return res.status(404).json({ message: "Seller not found" });

  seller.status = "Approved";
  res.json({ message: "Seller approved" });
});

router.put("/reject/:id", (req, res) => {
  const seller = data.sellers.find(s => s.id === parseInt(req.params.id));
  if (!seller) return res.status(404).json({ message: "Seller not found" });

  seller.status = "Rejected";
  res.json({ message: "Seller rejected" });
});

module.exports = router;
