const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Location", {
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
  });
};
