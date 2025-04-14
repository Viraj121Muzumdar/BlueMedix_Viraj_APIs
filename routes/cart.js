const express = require("express");
const router = express.Router();
const data = require("../db/data.json");

router.post("/add", (req, res) => {
  const { userId, productId, quantity } = req.body;
  data.cart.push({ userId, productId, quantity });
  res.status(201).json({ message: "Product added to cart" });
});

router.get("/:userId", (req, res) => {
  const cartItems = data.cart.filter(item => item.userId === parseInt(req.params.userId));
  res.json(cartItems);
});

router.delete("/:userId/:productId", (req, res) => {
  const index = data.cart.findIndex(
    item => item.userId === parseInt(req.params.userId) && item.productId === parseInt(req.params.productId)
  );
  if (index !== -1) {
    data.cart.splice(index, 1);
    res.json({ message: "Item removed from cart" });
  } else {
    res.status(404).json({ message: "Item not found in cart" });
  }
});

module.exports = router;
