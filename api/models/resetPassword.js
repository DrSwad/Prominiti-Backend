const { DataTypes } = require('sequelize')
const SequelizeTokenify = require('sequelize-tokenify')

module.exports = (sequelize) => {
  const ResetPassword = sequelize.define('ResetPassword', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  })

  SequelizeTokenify.tokenify(ResetPassword)
}
