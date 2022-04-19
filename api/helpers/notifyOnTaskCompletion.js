const {
  models: { Task },
} = require("../models");

async function notifyOnTaskCompletion(taskID) {
  console.log("Task completed:", taskID);
  await Task.update({ status: "COMPLETE" }, { where: { id: taskID } });
}

module.exports = notifyOnTaskCompletion;
