const { DataTypes } = require('sequelize')
const SequelizeTokenify = require('sequelize-tokenify')

module.exports = (sequelize) => {
  const Verification = sequelize.define('Verification', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  })

  SequelizeTokenify.tokenify(Verification)
}
