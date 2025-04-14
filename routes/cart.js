const express = require("express");
const router = express.Router();
const data = require("../db/data.json"); // Simulated in-memory JSON-based database

/**
 * Route: POST /add
 * Functionality: Adds a product to a user's cart.
 * Parameters (Body):
 *   - userId (number): The ID of the user.
 *   - productId (number): The ID of the product to add.
 *   - quantity (number): The quantity of the product to add.
 * Return Value:
 *   - 201 status with JSON message confirming addition to cart.
 */
router.post("/add", (req, res) => {
  const { userId, productId, quantity } = req.body;
  data.cart.push({ userId, productId, quantity }); // Add item to cart array
  res.status(201).json({ message: "Product added to cart" });
});

/**
 * Route: GET /:userId
 * Functionality: Retrieves all cart items belonging to a specific user.
 * Parameters (Route):
 *   - userId (number): The ID of the user whose cart is being retrieved.
 * Return Value:
 *   - JSON array containing all cart items for the given userId.
 */
router.get("/:userId", (req, res) => {
  const cartItems = data.cart.filter(item => item.userId === parseInt(req.params.userId));
  res.json(cartItems); // Respond with matching cart items
});

/**
 * Route: DELETE /:userId/:productId
 * Functionality: Removes a specific product from a user's cart.
 * Parameters (Route):
 *   - userId (number): The ID of the user.
 *   - productId (number): The ID of the product to remove.
 * Return Value:
 *   - On success: JSON message confirming deletion.
 *   - On failure: 404 status with JSON message indicating item not found.
 */
router.delete("/:userId/:productId", (req, res) => {
  const index = data.cart.findIndex(
    item => item.userId === parseInt(req.params.userId) && item.productId === parseInt(req.params.productId)
  );
  if (index !== -1) {
    data.cart.splice(index, 1); // Remove item from cart
    res.json({ message: "Item removed from cart" });
  } else {
    res.status(404).json({ message: "Item not found in cart" });
  }
});

module.exports = router;
