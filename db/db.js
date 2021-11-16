const Sequelize = require('sequelize')

const databaseName = process.env.DB_NAME || 'zhaul'

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  { logging: false }
)

module.exports = db
