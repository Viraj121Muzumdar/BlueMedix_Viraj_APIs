const express = require("express");
const router = express.Router();
const data = require("../db/data.json"); // Simulated in-memory database of sellers

/**
 * Route: POST /add
 * Functionality: Adds a new seller to the list.
 * Request Body:
 *   - seller (object): The new seller to be added to the database.
 * Return Value:
 *   - JSON message confirming the seller addition.
 *   - The added seller's data.
 */
router.post("/add", (req, res) => {
  const seller = req.body; // Get seller data from the request body
  data.sellers.push(seller); // Add the new seller to the sellers array
  res.status(201).json({ message: "Seller added", seller }); // Return confirmation and added seller
});

/**
 * Route: GET /list
 * Functionality: Retrieves the list of all sellers.
 * Return Value:
 *   - JSON array of all sellers.
 */
router.get("/list", (req, res) => res.json(data.sellers)); // Return all sellers

module.exports = router;
