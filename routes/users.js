const express = require("express");
const fs = require("fs");
const router = express.Router();
const users = require("../data/users.json");

router.post("/create", (req, res) => {
  users.push(req.body);
  fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 2));
  res.status(201).json({ message: "User created" });
});

router.put("/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  Object.assign(users[id], req.body);
  fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 2));
  res.json({ message: "User updated" });
});

router.delete("/delete/:id", (req, res) => {
  users.splice(req.params.id, 1);
  fs.writeFileSync("./data/users.json", JSON.stringify(users, null, 2));
  res.json({ message: "User deleted" });
});

router.get("/:id", (req, res) => {
  res.json(users[req.params.id]);
});

router.get("/list", (req, res) => {
  res.json(users);
});

module.exports = router;
