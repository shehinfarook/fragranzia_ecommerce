import express from 'express'
import checkoutController from '../controller/checkoutController'
import auth from '../config/auth'

const router = express.Router()

router.post('/checkout', auth, checkoutController.checkout)

module.exports = router