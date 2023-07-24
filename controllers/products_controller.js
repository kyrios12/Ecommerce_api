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

//Create operation for creating a product
const { promisify } = require('util');

module.exports.create = async function(req, res) {
  try {
    const newProduct = new Product({
      name: req.body.name,
      quantity: req.body.quantity
    });

    const saveAsync = promisify(newProduct.save.bind(newProduct));
    await saveAsync();

    res.send('New product added successfully.');
  } catch (error) {
    res.send(error);
  }
};
//To perform delete operation
module.exports.delete = async function(req, res) {
    const productID = req.params.productID; // Replace this with the actual product ID to delete
  
    try {
      const deleteOneAsync = promisify(Product.deleteOne.bind(Product));
      await deleteOneAsync({_id: productID});
      res.send({ message: "Product deleted" });
    } catch (error) {
      res.send(error);
    }
};

