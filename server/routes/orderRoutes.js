const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController');
const auth = require('../config/auth');
const adminAuth = require('../middleware/adminAuth');

router.post('/razorpay', auth, orderController.createRazorpayOrder);
router.post('/razorpay/verify', auth, orderController.verifyRazorpayPayment);
router.get('/', adminAuth, orderController.getOrders);
router.get('/user', auth, orderController.getUserOrders);
router.get('/:id', auth, orderController.getOrderById);
router.post('/', auth, orderController.createOrder);
router.put('/:id', adminAuth, orderController.updateOrderStatus);
router.put('/:id/cancel', auth, orderController.cancelOrder);
router.put('/:id/return', auth, orderController.returnOrder);
router.delete('/:id', adminAuth, orderController.deleteOrder);

module.exports = router;