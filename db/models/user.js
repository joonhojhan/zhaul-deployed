const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes
const crypto = require('crypto')
const db = require('../db')

const User = db.define('user', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    get() {
      return () => this.getDataValue('password')
    },
  },
  salt: {
    type: DataTypes.STRING,
    get() {
      return () => this.getDataValue('salt')
    },
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
})

User.prototype.correctPassword = function (pwd) {
  return User.encryptPassword(pwd, this.salt()) === this.password()
}

User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (text, salt) {
  return crypto.createHash('RSA-SHA256').update(text).update(salt).digest('hex')
}

const setSaltAndPassword = (user) => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
User.beforeBulkCreate((users) => {
  users.forEach(setSaltAndPassword)
})

module.exports = User
