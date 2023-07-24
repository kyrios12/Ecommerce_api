const express = require('express');
const router = express.Router();

// initializing products controller
const productsController = require('../controllers/products_controller');
//To create a product
router.post('/create', productsController.create);
// to get all the products
router.get('/', productsController.products);

module.exports = router;