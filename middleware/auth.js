// Importing the jsonwebtoken module to handle JWTs
const jwt = require("jsonwebtoken");

// The secret key used to sign and verify the JWT
const SECRET = "blueMedixSecret";

// Middleware function to authenticate the user via JWT
const authenticate = (req, res, next) => {
  // Extracting the token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1];

  // If no token is found, respond with a 401 Unauthorized error
  if (!token) return res.status(401).json({ message: "No token provided" });

  // Verifying the token using the secret key
  jwt.verify(token, SECRET, (err, user) => {
    // If there's an error (invalid token), respond with a 403 Forbidden error
    if (err) return res.status(403).json({ message: "Invalid token" });

    // Attach the decoded user data to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  });
};

// Exporting the middleware to be used in other parts of the application
module.exports = authenticate;
