const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes
const db = require('../db')

const Truck = db.define('truck', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('compact', 'mid-size', 'full-size', 'heavy-duty'),
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
})

module.exports = Truck
