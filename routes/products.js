const express = require('express');
const router = express.Router();

// initializing products controller
const productsController = require('../controllers/products_controller');

// to get all the products
router.get('/', productsController.products);