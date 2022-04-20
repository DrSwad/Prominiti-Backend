const {
  models: { Location },
} = require("../models");
const haversine = require("haversine-distance");
const { notifyOnTaskCompletion } = require("./taskReminders");

async function checkProximityTask(
  user_location,
  trackedUserId,
  distance,
  taskID,
  userID
) {
  const { longitude, latitude } = user_location;

  if (longitude != null && latitude != null) {
    const { longitude: longitude2, latitude: latitude2 } =
      await Location.findOne({ where: { UserId: trackedUserId } });

    if (longitude2 != null && latitude2 != null) {
      const calculated_distance = haversine(
        { longitude, latitude },
        { longitude: longitude2, latitude: latitude2 }
      );
      console.log(
        longitude,
        latitude,
        longitude2,
        latitude2,
        distance,
        calculated_distance
      );

      if (calculated_distance <= distance) {
        notifyOnTaskCompletion(userID, taskID);
      }
    }
  }
}

module.exports = checkProximityTask;
