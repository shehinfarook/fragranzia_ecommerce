const express = require('express');
const router = express.Router();
const productController = require('../controller/productController');
const adminAuth = require('../middleware/adminAuth');

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.post('/', adminAuth, productController.createProduct);
router.put('/:id', adminAuth, productController.updateProduct);
router.delete('/:id', adminAuth, productController.deleteProduct);

module.exports = router;