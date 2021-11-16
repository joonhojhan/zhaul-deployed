const User = require('./user')
const Truck = require('./truck')
const Reservation = require('./reservation')

User.hasMany(Reservation)
Truck.hasMany(Reservation)
Reservation.belongsTo(User)
Reservation.belongsTo(Truck)
