const scheduler = require("node-schedule");
const notifyOnTaskCompletion = require("./notifyOnTaskCompletion");
const {
  models: { Task },
} = require("../models");

class TaskScheduler {
  static jobs = {};

  constructor() {}

  static async init() {
    const tasks = await Task.findAll({
      attributes: ["id", "type", "time"],
      where: { status: "PENDING" },
    });

    tasks.forEach((row) => {
      const { id, type, time } = row;
      if (type === "TIME") this.schedule(id, time.getTime());
    });
  }

  static schedule(taskID, start) {
    const date = new Date(start);
    if (start < Date.now()) notifyOnTaskCompletion(taskID);
    this.delete(taskID);
    TaskScheduler.jobs[taskID] = scheduler.scheduleJob(date, async () => {
      notifyOnTaskCompletion(taskID);
    });
  }

  static delete(taskID) {
    if (TaskScheduler.jobs[taskID]) {
      TaskScheduler.jobs[taskID].cancel();
    }
  }
}

module.exports = TaskScheduler;
