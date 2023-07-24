const Product = require('../models/product');
const { promisify } = require('util');
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

module.exports.create = function(req, res){
  const newProduct = new Product({
      name: req.body.name,
      quantity: req.body.quantity
  });
  newProduct.save().then(function(err){
    
      if(err){
          res.send(err);
      }else{
          res.send('New product added successfully.');
      }
  
  });
}
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
//To perform update operation
module.exports.updateQuantity = async function(req, res) {
    const ID = req.params.productID;
  
    try {
      // Find the product using the ID
      const findByIdAsync = promisify(Product.findById.bind(Product));
      const found = await findByIdAsync(ID);
  
      const newQty = parseInt(found.quantity) + parseInt(req.query.number);
  
      // Update the product's quantity
      const findByIdAndUpdateAsync = promisify(Product.findByIdAndUpdate.bind(Product));
      const updatedProduct = await findByIdAndUpdateAsync(ID, { quantity: newQty });
  
      updatedProduct.quantity = newQty;
      res.send({
        product: updatedProduct,
        message: 'Updated successfully'
      });
    } catch (error) {
      res.send(error);
    }
  };
  
  