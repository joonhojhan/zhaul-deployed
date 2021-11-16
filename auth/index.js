const router = require('express').Router()
const User = require('../db/models/user')

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email: email } })
    if (!user) {
      console.log(`No user found with email: ${email}.`)
      return res.status(401).send('Incorrect email and / or password.')
    } else if (!user.correctPassword(password)) {
      console.log(`Incorrect password for user with email: ${email}.`)
      return res.status(401).send('Incorrect email and / or password.')
    } else {
      return req.login(user, (err) => (err ? next(err) : res.json(user)))
    }
  } catch (error) {
    console.error(error)
    next(error)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body
    const user = await User.create({ firstName, lastName, email, password })
    req.login(user, (err) => (err ? next(err) : res.json(user)))
  } catch (error) {
    if (error.name === `SequelizeUniqueConstraintError`) {
      res.status(401).send(`User already exists`)
    } else {
      console.error(error)
      next(error)
    }
  }
})

router.post('/logout', async (req, res) => {
  await req.logout()
  await req.session.destroy()
  return res.sendStatus(200)
})

router.get('/me', (req, res) => {
  return res.json(req.user)
})

module.exports = router
