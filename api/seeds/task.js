const {
  models: { Task },
} = require("../models");

module.exports = {
  run: async () => {
    let tasks = await Task.findAll();
    if (tasks.length === 0) {
      tasks = [
        {
          UserId: "75e851c1-acc6-46ea-969a-f28829a1de44",
          description: "This is a time-based reminder.",
          type: "TIME",
          time: "2022-04-19 21:51:00",
          status: "PENDING",
        },
        {
          UserId: "75e851c1-acc6-46ea-969a-f28829a1de44",
          description: "This is a proximity-based reminder.",
          type: "PROXIMITY",
          trackedUserId: "a3d368f7-95a0-4f5e-954a-1102a39beddc",
          distance: 20,
          status: "PENDING",
        },
      ];

      await Task.bulkCreate(tasks);
    }
  },
};
