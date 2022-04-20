const { Router } = require("express");
const router = Router();

const {
  authenticatedMiddleware,
} = require("../../helpers/authenticatedMiddleware");
const { processReminders } = require("../../helpers/taskReminders");

router.get(
  "/reminders",
  authenticatedMiddleware,
  async function (req, res, next) {
    try {
      const userID = req.user.id;
      return res.json({ data: await processReminders(userID) }).end();
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
