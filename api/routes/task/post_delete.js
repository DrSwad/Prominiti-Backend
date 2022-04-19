const { Router } = require("express");
const router = Router();

const {
  models: { Task },
} = require("../../models");
const {
  authenticatedMiddleware,
} = require("../../helpers/authenticatedMiddleware");

router.post(
  "/delete",
  authenticatedMiddleware,
  async function (req, res, next) {
    try {
      const userID = req.user.id;
      const { taskID } = req.body;

      const task = await Task.findByPk(taskID);
      const owner = await task.getUser();

      if (userID !== owner.id) {
        const err = new Error("You are not authorized to delete the task");
        err.status = 401;
        throw err;
      }

      await task.destroy();

      return res.json({
        message: "Task deleted successfully!",
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
