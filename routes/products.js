const express = require('express');
const router = express.Router();

// initializing products controller
const productsController = require('../controllers/products_controller');

// to get all the products
router.get('/', productsController.products);

//To create a product
router.post('/create', productsController.create);

// to delete a product using it's ID
router.delete('/:productID', productsController.delete);
module.exports = router;