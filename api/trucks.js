const router = require('express').Router()
const Truck = require('../db/models/truck')
const Reservation = require('../db/models/reservation')
const { Op } = require('sequelize')
/*
	Get all trucks
	Get available trucks
*/

router.get('/', async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      const trucks = await Truck.findAll()
      return res.json(trucks)
    }
    return res.status(403).send('You need to be an admin to access this route!')
  } catch (error) {
    console.error(error.message)
    next(error)
  }
})

router.get('/available', async (req, res, next) => {
  try {
    const { start, end, type } = req.query
    const startDate = new Date(start)
    const endDate = new Date(end)
    const trucks = await Truck.findAll({
      include: {
        model: Reservation,
      },
    })
    const available = trucks.filter((truck) => {
      if (type === 'all') {
        return !truck.reservations.some((reservation) => {
          if (reservation.end <= startDate || reservation.start >= endDate) {
            return false
          }
          return true
        })
      }
      return (
        truck.type === type &&
        !truck.reservations.some((reservation) => {
          if (reservation.end <= startDate || reservation.start >= endDate) {
            return false
          }
          return true
        })
      )
    })
    return res.json(available.sort((a, b) => a.price - b.price))
  } catch (error) {
    console.error(error.message)
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const truck = await Truck.findByPk(id)
    return res.json(truck)
  } catch (error) {
    console.error(error.message)
    next(error)
  }
})

module.exports = router
