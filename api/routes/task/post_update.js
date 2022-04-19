const { Router } = require("express");
const router = Router();

const {
  models: { Task },
} = require("../../models");
const {
  authenticatedMiddleware,
} = require("../../helpers/authenticatedMiddleware");

router.post(
  "/update",
  authenticatedMiddleware,
  async function (req, res, next) {
    try {
      const userID = req.user.id;
      const {
        taskID,
        description,
        type,
        time,
        trackedUserId,
        distance,
        status,
      } = req.body;

      const task = await Task.findByPk(taskID);
      const owner = await task.getUser();

      if (userID !== owner.id) {
        const err = new Error("You are not authorized to modify the task");
        err.status = 401;
        throw err;
      }

      await task.update({
        description,
        type,
        time,
        trackedUserId,
        distance,
        status: status || "PENDING",
      });

      return res.json({
        message: "Task updated successfully!",
        data: { task: task.dataValues },
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
