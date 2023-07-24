const Product = require('../models/product');

// function to show all the products
module.exports.products = function(req, res){
    Product.find({})
        .then(foundProducts=>{
            res.send(foundProducts);
        })
        .catch(err=>{
            res.send(err);
        })
           
    }

    
