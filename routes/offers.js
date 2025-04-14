const express = require("express");
const router = express.Router();
const data = require("../db/data.json");

router.get("/", (req, res) => res.json(data.offers));

router.post("/create", (req, res) => {
  const offer = req.body;
  data.offers.push(offer);
  res.status(201).json({ message: "Offer created", offer });
});

router.put("/update/:id", (req, res) => {
  const idx = data.offers.findIndex(o => o.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: "Offer not found" });

  Object.assign(data.offers[idx], req.body);
  res.json({ message: "Offer updated", offer: data.offers[idx] });
});

router.delete("/delete/:id", (req, res) => {
  const idx = data.offers.findIndex(o => o.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ message: "Offer not found" });

  data.offers.splice(idx, 1);
  res.json({ message: "Offer deleted" });
});

module.exports = router;
