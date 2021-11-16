const Sequelize = require('sequelize')

const databaseName = process.env.DB_NAME || 'zhaul'

let config

if (process.env.DATABASE_URL) {
  config = {
    logging: false,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
} else {
  config = {
    logging: false,
  }
}

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  config
)

module.exports = db
