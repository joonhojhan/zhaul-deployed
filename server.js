require('dotenv').config()
const path = require('path')
const express = require('express')
// const cors = require('cors')
const session = require('express-session')
const passport = require('passport')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db')
const sessionStore = new SequelizeStore({ db })

const app = express()

const PORT = process.env.PORT || 8080

// let corsOptions = {
//   origin: 'http://localhost:3000',
// }

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id)
    done(null, user)
  } catch (error) {
    done(error)
  }
})

const createApp = () => {
  if (process.env.NODE_ENV === 'dev') {
    app.use(require('morgan')('dev'))
  }
  app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.header(
      'Access-Control-Allow-Headers',
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
    )
    if ('OPTIONS' == req.method) {
      res.sendStatus(200)
    } else {
      next()
    }
  })
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'test-session-secret',
      store: sessionStore,
      resave: false,
      saveUninitialized: false,
    })
  )

  app.use(passport.initialize())
  app.use(passport.session())

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'build')))
  }

  app.use('/auth', require('./auth'))
  app.use('/api', require('./api'))
  if (process.env.NODE_ENV === 'production') {
    app.get('/*', (req, res) => {
      res.sendFile(path.join(__dirname, 'build', 'index.html'))
    })
  }
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err || 'Internal server error.')
  })
}

const startListening = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`)
  })
}

const syncDb = () => db.sync({ force: false })

async function bootApp() {
  await sessionStore.sync()
  await syncDb()
  await createApp()
  await startListening()
}

bootApp()
