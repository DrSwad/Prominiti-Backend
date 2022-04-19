const { Router } = require("express");
const router = Router();

const {
  models: { Task },
} = require("../../models");
const {
  authenticatedMiddleware,
} = require("../../helpers/authenticatedMiddleware");

router.get("/:id", authenticatedMiddleware, async function (req, res, next) {
  try {
    const userID = req.user.id;
    const taskID = req.params.id;

    const task = await Task.findByPk(taskID);
    const owner = await task.getUser();

    if (userID !== owner.id) {
      const err = new Error("You are not authorized to view the task");
      err.status = 401;
      throw err;
    }

    return res.json({
      data: { task: task.dataValues },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
