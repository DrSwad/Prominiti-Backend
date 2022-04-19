const { Router } = require("express");
const router = Router();

const {
  models: { Task },
} = require("../../models");
const {
  authenticatedMiddleware,
} = require("../../helpers/authenticatedMiddleware");

router.get("/", authenticatedMiddleware, async function (req, res, next) {
  try {
    const userID = req.user.id;

    const tasks = await Task.findAll({
      ownerId: userID,
    });

    return res.json({
      data: { tasks },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
