const express = require('express');
const router = express.Router();
const categoryController = require('../controller/categoryController');
const adminAuth = require('../middleware/adminAuth');

router.get('/', categoryController.getAllCategories);
router.post('/', adminAuth, categoryController.createCategory);
router.delete('/:id', adminAuth, categoryController.deleteCategory);

module.exports = router;
