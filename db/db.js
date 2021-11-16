const Sequelize = require('sequelize')

const databaseName = process.env.DB_NAME || 'zhaul'

let db

// if (process.env.DATABASE_URL) {
//   db = new Sequelize(process.env.DATABASE_URL, { logging: false })
// } else {
db = new Sequelize(
  process.env.DATABASE,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    logging: false,
  }
)
// }

module.exports = db
