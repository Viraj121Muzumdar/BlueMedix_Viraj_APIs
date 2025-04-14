const express = require("express");
const fs = require("fs");
const router = express.Router();
let orders = require("../data/orders.json"); // Simulated in-memory database of orders

/**
 * Route: POST /create
 * Functionality: Creates a new order and saves it to the orders database.
 * Parameters (Body):
 *   - The order object (e.g., contains `user_id`, `product_id`, `quantity`, `status`, etc.).
 * Return Value:
 *   - 201 status with a JSON message confirming the order placement.
 */
router.post("/create", (req, res) => {
  orders.push(req.body); // Add the new order to the orders array
  fs.writeFileSync("./data/orders.json", JSON.stringify(orders, null, 2)); // Save the updated orders to file
  res.status(201).json({ message: "Order placed" }); // Respond with confirmation
});

/**
 * Route: PUT /status/:id
 * Functionality: Updates the status of an existing order by its ID.
 * Parameters (Route):
 *   - id (number): The ID of the order to be updated.
 * Parameters (Body):
 *   - new_status (string): The new status to be assigned to the order (e.g., "shipped", "delivered", etc.).
 * Return Value:
 *   - On success: JSON message confirming the status update.
 *   - On failure (e.g., invalid ID): 404 status with an error message.
 */
router.put("/status/:id", (req, res) => {
  orders[req.params.id].status = req.body.new_status; // Update the order status
  fs.writeFileSync("./data/orders.json", JSON.stringify(orders, null, 2)); // Save the updated orders to file
  res.json({ message: "Status updated" }); // Respond with confirmation
});

/**
 * Route: GET /:id
 * Functionality: Retrieves details of a specific order by its ID.
 * Parameters (Route):
 *   - id (number): The ID of the order to be fetched.
 * Return Value:
 *   - JSON object containing the details of the order.
 *   - On failure (e.g., invalid ID): 404 status with an error message.
 */
router.get("/:id", (req, res) => {
  res.json(orders[req.params.id]); // Respond with the order details
});

/**
 * Route: GET /user/:userId
 * Functionality: Retrieves all orders placed by a specific user.
 * Parameters (Route):
 *   - userId (number): The ID of the user whose orders are to be retrieved.
 * Return Value:
 *   - JSON array containing all orders placed by the specified user.
 */
router.get("/user/:userId", (req, res) => {
  const userOrders = orders.filter(o => o.user_id == req.params.userId); // Filter orders by user_id
  res.json(userOrders); // Respond with the user's orders
});

/**
 * Route: GET /track/:id
 * Functionality: Retrieves the tracking status of an order by its ID.
 * Parameters (Route):
 *   - id (number): The ID of the order to track.
 * Return Value:
 *   - JSON object containing the status of the order.
 *   - If the order is not found: JSON with "Not found" status.
 */
router.get("/track/:id", (req, res) => {
  res.json({ status: orders[req.params.id]?.status || "Not found" }); // Respond with order status or "Not found"
});

/**
 * Route: POST /cancel/:id
 * Functionality: Cancels an order by updating its status to "cancelled".
 * Parameters (Route):
 *   - id (number): The ID of the order to be cancelled.
 * Return Value:
 *   - JSON message confirming the cancellation.
 */
router.post("/cancel/:id", (req, res) => {
  orders[req.params.id].status = "cancelled"; // Change order status to "cancelled"
  fs.writeFileSync("./data/orders.json", JSON.stringify(orders, null, 2)); // Save the updated orders to file
  res.json({ message: "Order cancelled" }); // Respond with cancellation confirmation
});

module.exports = router;

