const scheduler = require("node-schedule");
const { notifyOnTaskCompletion } = require("./taskReminders");
const {
  models: { Task },
} = require("../models");

class TaskScheduler {
  static jobs = {};

  constructor() {}

  static async init() {
    const tasks = await Task.findAll({
      attributes: ["id", "type", "time", "UserId"],
      where: { status: "PENDING" },
    });

    tasks.forEach((row) => {
      const { id, type, time, UserId } = row;
      if (type === "TIME") this.schedule(id, time.getTime(), UserId);
    });
  }

  static schedule(taskID, start, userId) {
    const date = new Date(start);
    if (start < Date.now()) notifyOnTaskCompletion(userId, taskID);
    this.delete(taskID);
    TaskScheduler.jobs[taskID] = scheduler.scheduleJob(date, async () => {
      notifyOnTaskCompletion(userId, taskID);
    });
  }

  static delete(taskID) {
    if (TaskScheduler.jobs[taskID]) {
      TaskScheduler.jobs[taskID].cancel();
    }
  }
}

module.exports = TaskScheduler;
