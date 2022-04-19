const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Task", {
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("TIME", "PROXIMITY"),
      defaultValue: "TIME",
    },
    time: {
      type: "TIMESTAMP",
      allowNull: true,
    },
    trackedUserId: {
      type: DataTypes.CITEXT,
      allowNull: true,
    },
    distance: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("PENDING", "COMPLETE"),
      defaultValue: "PENDING",
    },
  });
};
