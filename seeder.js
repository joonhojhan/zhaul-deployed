const db = require('./db')
const Truck = require('./db/models/truck')
const User = require('./db/models/user')

const trucks = [
  {
    name: 'Betsy',
    type: 'mid-size',
    price: 20.0,
  },
  {
    name: 'Dwayne',
    type: 'heavy-duty',
    price: 50.0,
  },
  {
    name: 'Billy',
    type: 'compact',
    price: 15.0,
  },
  {
    name: 'Ally',
    type: 'full-size',
    price: 30.0,
  },
  {
    name: 'Timmy',
    type: 'mid-size',
    price: 20.0,
  },
  {
    name: 'Carl',
    type: 'compact',
    price: 15.0,
  },
  {
    name: 'Tina',
    type: 'full-size',
    price: 30.0,
  },
]

const users = [
  {
    firstName: 'Joonho',
    lastName: 'Han',
    email: 'joonhojhan@gmail.com',
    password: 'test123',
    isAdmin: true,
  },
  {
    firstName: 'Cody',
    lastName: 'Pug',
    email: 'cody@pug.com',
    password: 'test123',
  },
  {
    firstName: 'Joe',
    lastName: 'Biden',
    email: 'joebiden@president.com',
    password: 'test123',
  },
]

async function seed() {
  //sync db
  await db.sync({ force: true })
  console.log('db synced!')

  // seed users
  console.log('seeding users...')
  await Promise.all(
    users.map((user) => {
      return User.create(user)
    })
  )
  console.log('users seeded!')

  // seed trucks
  console.log('seeding trucks...')
  await Promise.all(
    trucks.map((truck) => {
      return Truck.create(truck)
    })
  )
  console.log('trucks seeded!')
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (error) {
    console.error(error.message)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

runSeed()
