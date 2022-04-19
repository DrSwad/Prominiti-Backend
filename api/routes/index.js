const { Router } = require("express");
const router = Router();

module.exports = function (passport) {
  router.use("/", require("./auth")(passport));
  router.use("/", require("./user"));
  router.use("/", require("./task"));
  router.use("/", require("./favorite_users"));
  router.use("/", require("./location"));
  router.use("/", require("./search_users"));

  return router;
};
