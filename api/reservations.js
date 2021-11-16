const router = require('express').Router()
const sequelize = require('sequelize')
const Reservation = require('../db/models/reservation')
const Truck = require('../db/models/truck')
const User = require('../db/models/user')
/*
	Get all reservations
	Get single reservation
	Make reservation
*/

router.get('/', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const reservations = await Reservation.findAll({
        include: [{ model: Truck }, { model: User }],
      })
      return res.json(reservations)
    }
    return res.status(403).send('You need to be an admin to access this route!')
  } catch (error) {
    console.error(error.message)
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { start, end, truckId } = req.body
    const truck = await Truck.findByPk(truckId)
    const reservation = await Reservation.create({
      start: new Date(start),
      end: new Date(end),
      truckId,
      userId: req.user.id,
      price:
        Number(truck.price * (new Date(end) - new Date(start))) /
        (1000 * 60 * 60 * 24),
    })
    return res.json(reservation)
  } catch (error) {
    console.error(error.message)
    next(error)
  }
})

router.get('/history', async (req, res, next) => {
  try {
    const reservations = await Reservation.findAll({
      where: { userId: req.user.id },
      include: Truck,
    })
    return res.json(reservations.sort((a, b) => a.createdAt - b.createdAt))
  } catch (error) {
    console.error(error.message)
    next(error)
  }
})

// router.get('/:id', async (req, res, next) => {
//   try {
//     const reservation = await Reservation.findOne({
//       where: { id: req.params.id },
//       include: Truck,
//     })
//     return res.json(reservation)
//   } catch (error) {
//     console.error(error.message)
//     next(error)
//   }
// })

module.exports = router
