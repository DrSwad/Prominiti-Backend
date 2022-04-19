/* eslint-disable import/order */
const express = require("express");

// Create express instance
const app = express();

// Get environment
const { env } = require("./config");

// Log requests to the console for debugging purposes
if (env === "development") app.use(require("morgan")("dev"));

// Disable CORS
app.use(require("cors")());

// Parse urlencoded and json data and put them in req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configure models, sync with database and generate seed data
require("./api/models");

// Passport for auth
const passport = require("passport");
require("./api/helpers/passportStrategies")(passport); // Load the passport configuration for
// custom local strategy and jwt strategy, and set up the passport instance using it
app.use(passport.initialize()); // Initialize passport for use in express middlewares

// Initalize authenticated middleware using the configured passport instance
const { initMiddleware } = require("./api/helpers/authenticatedMiddleware");
initMiddleware(passport);

// Setup API Routes
app.use(require("./api/routes")(passport));

// Setup error handler
require("./api/helpers/errorHandler").initializeErrorHandler(app);

// Export express app
module.exports = app;

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`API server listening on port ${port}`);
  });
}
