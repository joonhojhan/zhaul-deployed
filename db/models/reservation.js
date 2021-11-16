const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes
const db = require('../db')

const Reservation = db.define('reservation', {
  start: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
})

module.exports = Reservation
