const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const auth = require('../config/auth');
const adminAuth = require('../middleware/adminAuth');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', auth, userController.getProfile);
router.get('/me', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);
router.delete('/profile', auth, userController.deleteProfile);
router.get('/all', adminAuth, userController.getAllUsers);

module.exports = router;
