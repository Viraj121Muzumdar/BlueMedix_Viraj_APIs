const express = require("express");
const router = express.Router();
const data = require("../db/data.json");

router.post("/status", (req, res) => {
  const { orderId, status } = req.body;
  const order = data.orders.find(o => o.id === parseInt(orderId));
  if (!order) return res.status(404).json({ message: "Order not found" });

  order.status = status;
  res.json({ message: `Delivery status updated to ${status}`, order });
});

module.exports = router;
