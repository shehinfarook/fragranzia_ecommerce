const express = require('express');
const router = express.Router();
const cartController = require('../controller/cartController');
const auth = require('../config/auth');

router.get('/', auth, cartController.getCart);
router.post('/add', auth, cartController.addToCart);
router.put('/:productId', auth, cartController.updateCartItem);
router.delete('/:productId', auth, cartController.removeCartItem);
router.post('/checkout', auth, cartController.checkout);

module.exports = router;
