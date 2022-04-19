const { Router } = require("express");
const router = Router();

const {
  models: { Task, User, Location },
} = require("../../models");
const {
  authenticatedMiddleware,
} = require("../../helpers/authenticatedMiddleware");
const checkProximityTask = require("../../helpers/checkProximityTask");

router.post("/new", authenticatedMiddleware, async function (req, res, next) {
  try {
    const userID = req.user.id;
    let { description, type, time, trackedUserId, distance } = req.body;
    distance = parseFloat(distance);

    const task = await Task.create({
      ownerId: userID,
      description,
      type,
      time: time ? new Date(time * 1000) : null,
      trackedUserId,
      distance,
    });

    let trackedUser;
    try {
      trackedUser = await User.findByPk(trackedUserId);
    } catch (ignore) {
      const err = new Error("Target user not found!");
      err.status = 401;
      throw err;
    }

    const user_location = await Location.findOne({
      where: { UserId: userID },
    });
    checkProximityTask(
      user_location,
      trackedUserId,
      distance,
      task.dataValues.id
    );

    return res.json({
      message: "Task created successfully!",
      data: { task: task.dataValues },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
