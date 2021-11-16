const router = require('express').Router()
const stripe = require('stripe')(process.env.STRIPE_SECRET_TEST)

router.post('/create-payment-intent', async (req, res) => {
  const { items, start, end } = req.body

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount:
      (Number(Number(items.price) * 100) * (new Date(end) - new Date(start))) /
      (1000 * 60 * 60 * 24),
    currency: 'usd',
    payment_method_types: ['card'],
  })

  res.send({
    clientSecret: paymentIntent.client_secret,
  })
})

module.exports = router
