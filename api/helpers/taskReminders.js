const {
  models: { Task },
} = require("../models");

let queue = {};

async function notifyOnTaskCompletion(userID, taskID) {
  if (!queue[userID]) queue[userID] = [];
  queue[userID].push(taskID);
}

async function processReminders(userID) {
  if (!queue[userID]) return;
  const tasks = queue[userID];
  const taskDetails = await Promise.all(
    tasks.map(async (taskID) => {
      const task = await Task.findByPk(taskID);
      console.log("Task completed:", taskID);
      await Task.update({ status: "COMPLETE" }, { where: { id: taskID } });
      return { description: task.description };
    })
  );
  queue[userID] = [];
  return taskDetails;
}

module.exports = { notifyOnTaskCompletion, processReminders };
