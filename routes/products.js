const express = require("express");
const fs = require("fs");
const router = express.Router();
let products = require("../data/products.json"); // Simulated in-memory database of products

/**
 * Route: GET /list
 * Functionality: Retrieves the list of all products.
 * Parameters: None
 * Return Value:
 *   - JSON array containing all the products.
 */
router.get("/list", (req, res) => res.json(products)); // Return all products

/**
 * Route: GET /:id
 * Functionality: Retrieves details of a specific product by its ID.
 * Parameters (Route):
 *   - id (number): The ID of the product to be fetched.
 * Return Value:
 *   - JSON object containing the details of the product.
 *   - If the product is not found, returns 404 with a "Not found" message.
 */
router.get("/:id", (req, res) => {
  const product = products[req.params.id]; // Find the product by its ID
  product ? res.json(product) : res.status(404).json({ message: "Not found" }); // Return the product or 404 error
});

/**
 * Route: POST /create
 * Functionality: Creates a new product and saves it to the products database.
 * Parameters (Body):
 *   - The product object (e.g., contains `name`, `price`, `description`, etc.).
 * Return Value:
 *   - 201 status with a JSON message confirming the product creation.
 */
router.post("/create", (req, res) => {
  products.push(req.body); // Add the new product to the products array
  fs.writeFileSync("./data/products.json", JSON.stringify(products, null, 2)); // Save the updated products to file
  res.status(201).json({ message: "Product created" }); // Respond with confirmation
});

/**
 * Route: PUT /update/:id
 * Functionality: Updates the details of an existing product by its ID.
 * Parameters (Route):
 *   - id (number): The ID of the product to be updated.
 * Parameters (Body):
 *   - Product object containing the new details of the product (e.g., updated `name`, `price`, etc.).
 * Return Value:
 *   - JSON message confirming the product update.
 *   - If the product is not found, returns 404 with an error message.
 */
router.put("/update/:id", (req, res) => {
  Object.assign(products[req.params.id], req.body); // Update the product with the new data
  fs.writeFileSync("./data/products.json", JSON.stringify(products, null, 2)); // Save the updated products to file
  res.json({ message: "Product updated" }); // Respond with confirmation
});

/**
 * Route: DELETE /delete/:id
 * Functionality: Deletes an existing product by its ID.
 * Parameters (Route):
 *   - id (number): The ID of the product to be deleted.
 * Return Value:
 *   - JSON message confirming the deletion.
 *   - If the product is not found, returns 404 with an error message.
 */
router.delete("/delete/:id", (req, res) => {
  products.splice(req.params.id, 1); // Remove the product by its ID
  fs.writeFileSync("./data/products.json", JSON.stringify(products, null, 2)); // Save the updated products to file
  res.json({ message: "Deleted" }); // Respond with confirmation
});

/**
 * Route: POST /import
 * Functionality: Simulates importing products (not implemented).
 * Parameters (Body): None
 * Return Value:
 *   - JSON message indicating that import functionality is not implemented in this demo.
 */
router.post("/import", (req, res) => {
  res.json({ message: "Import not implemented in demo" }); // Simulated response
});

module.exports = router;

