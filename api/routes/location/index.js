const { Router } = require("express");
const router = Router();

const {
  models: { Location, Task },
} = require("../../models");
const {
  authenticatedMiddleware,
} = require("../../helpers/authenticatedMiddleware");
const checkProximityTask = require("../../helpers/checkProximityTask");

router.post(
  "/location",
  authenticatedMiddleware,
  async function (req, res, next) {
    try {
      const userID = req.user.id;
      let { longitude, latitude } = req.body;
      longitude = parseFloat(longitude);
      latitude = parseFloat(latitude);

      await Location.update(
        { longitude, latitude },
        { where: { UserId: userID } }
      );

      // Check if any proximity task is satisfied now
      if (longitude != null && latitude != null) {
        await Promise.all(
          (
            await Task.findAll({
              attributes: ["id", "trackedUserId", "distance"],
              where: { UserId: userID, type: "PROXIMITY", status: "PENDING" },
            })
          ).map(({ id: taskID, trackedUserId, distance }) => {
            return checkProximityTask(
              { longitude, latitude },
              trackedUserId,
              distance,
              taskID
            );
          })
        );
      }

      return res.json({
        message: "Location updated successfully!",
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
