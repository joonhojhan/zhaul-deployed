const router = require('express').Router()
const User = require('../db/models/user')

router.get('/', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const users = await User.findAll()
      return res.json(users)
    }
    return res.status(403).send('You need to be an admin to access this route!')
  } catch (error) {
    console.error(error.message)
    next(error)
  }
})

module.exports = router
