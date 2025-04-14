// Importing required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Importing route modules
const authRoutes = require("./routes/auth"); // Authentication-related routes
const userRoutes = require("./routes/users"); // User-related routes
const productRoutes = require("./routes/products"); // Product-related routes
const orderRoutes = require("./routes/orders"); // Order-related routes

// Initializing the Express application
const app = express();
const PORT = 8000; // The port on which the server will listen

// Middleware
app.use(cors()); // Enabling Cross-Origin Resource Sharing (CORS) for all routes
app.use(bodyParser.json()); // Parsing incoming JSON data in requests

// Registering routes with their respective paths
app.use("/auth", authRoutes); // Authentication routes will be prefixed with /auth
app.use("/users", userRoutes); // User routes will be prefixed with /users
app.use("/products", productRoutes); // Product routes will be prefixed with /products
app.use("/orders", orderRoutes); // Order routes will be prefixed with /orders

// Starting the server and listening on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log when the server is up and running
});
