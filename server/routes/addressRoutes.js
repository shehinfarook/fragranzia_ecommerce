const express = require('express');
const router = express.Router();
const addressController = require('../controller/addressController');
const auth = require('../config/auth');

router.get('/', auth, addressController.getAddresses);
router.post('/', auth, addressController.addAddress);
router.put('/:id', auth, addressController.updateAddress);
router.delete('/:id', auth, addressController.deleteAddress);

module.exports = router;
