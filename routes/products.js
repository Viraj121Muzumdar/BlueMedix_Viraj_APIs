const express = require("express");
const fs = require("fs");
const router = express.Router();
let products = require("../data/products.json");

router.get("/list", (req, res) => res.json(products));

router.get("/:id", (req, res) => {
  const product = products[req.params.id];
  product ? res.json(product) : res.status(404).json({ message: "Not found" });
});

router.post("/create", (req, res) => {
  products.push(req.body);
  fs.writeFileSync("./data/products.json", JSON.stringify(products, null, 2));
  res.status(201).json({ message: "Product created" });
});

router.put("/update/:id", (req, res) => {
  Object.assign(products[req.params.id], req.body);
  fs.writeFileSync("./data/products.json", JSON.stringify(products, null, 2));
  res.json({ message: "Product updated" });
});

router.delete("/delete/:id", (req, res) => {
  products.splice(req.params.id, 1);
  fs.writeFileSync("./data/products.json", JSON.stringify(products, null, 2));
  res.json({ message: "Deleted" });
});

router.post("/import", (req, res) => {
  res.json({ message: "Import not implemented in demo" });
});

module.exports = router;
