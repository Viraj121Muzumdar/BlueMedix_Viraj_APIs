const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const SECRET = "your_jwt_secret";

router.post("/login-otp", (req, res) => {
  const { phone_number } = req.body;
  const otp = "123456";
  res.json({ message: "OTP sent", otp }); // simulate
});

router.post("/verify-otp", (req, res) => {
  const { phone_number, otp } = req.body;
  if (otp === "123456") {
    const token = jwt.sign({ phone_number }, SECRET, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid OTP" });
  }
});

router.post("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

router.get("/me", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    res.json({ user });
  });
});

module.exports = router;

