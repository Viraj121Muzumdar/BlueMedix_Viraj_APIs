const express = require("express");
const fs = require("fs");
const router = express.Router();
let orders = require("../data/orders.json");

router.post("/create", (req, res) => {
  orders.push(req.body);
  fs.writeFileSync("./data/orders.json", JSON.stringify(orders, null, 2));
  res.status(201).json({ message: "Order placed" });
});

router.put("/status/:id", (req, res) => {
  orders[req.params.id].status = req.body.new_status;
  fs.writeFileSync("./data/orders.json", JSON.stringify(orders, null, 2));
  res.json({ message: "Status updated" });
});

router.get("/:id", (req, res) => {
  res.json(orders[req.params.id]);
});

router.get("/user/:userId", (req, res) => {
  const userOrders = orders.filter(o => o.user_id == req.params.userId);
  res.json(userOrders);
});

router.get("/track/:id", (req, res) => {
  res.json({ status: orders[req.params.id]?.status || "Not found" });
});

router.post("/cancel/:id", (req, res) => {
  orders[req.params.id].status = "cancelled";
  fs.writeFileSync("./data/orders.json", JSON.stringify(orders, null, 2));
  res.json({ message: "Order cancelled" });
});

module.exports = router;
