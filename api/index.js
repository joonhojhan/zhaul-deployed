const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/trucks', require('./trucks'))
router.use('/reservations', require('./reservations'))
router.use('/stripe', require('./stripe'))

router.use((req, res, next) => {
  const error = new Error('Not found.')
  error.status = 404
  next(error)
})

module.exports = router
