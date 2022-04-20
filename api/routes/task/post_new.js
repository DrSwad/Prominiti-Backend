const { Router } = require("express");
const router = Router();
const TaskScheduler = require("../../helpers/TaskScheduler");

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
    let { description, type, time, trackedUsername, distance } = req.body;
    distance = parseFloat(distance);

    if (type === "TIME" && time * 1000 < Date.now()) {
      const err = new Error("Time must be in the future!");
      err.status = 401;
      throw err;
    }

    let trackedUserId;
    if (type === "PROXIMITY") {
      try {
        const trackedUser = await User.findOne({
          where: { username: trackedUsername },
        });
        trackedUserId = trackedUser.id;
      } catch (ignore) {
        const err = new Error("Target user not found!");
        err.status = 401;
        throw err;
      }
    }

    const task = await Task.create({
      UserId: userID,
      description,
      type,
      time: time ? new Date(time * 1000) : null,
      trackedUserId: trackedUserId || null,
      distance: Number.isNaN(distance) ? null : distance,
    });

    if (type === "PROXIMITY") {
      const user_location = await Location.findOne({
        where: { UserId: userID },
      });
      checkProximityTask(
        user_location,
        trackedUserId,
        distance,
        task.dataValues.id,
        userID
      );
    } else {
      TaskScheduler.schedule(task.dataValues.id, time * 1000);
    }

    return res.json({
      message: "Task created successfully!",
      data: { task: task.dataValues },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
