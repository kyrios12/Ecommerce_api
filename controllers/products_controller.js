const Product = require('../models/product');
// function to show all the products
module.exports.products = async function(req, res) {
  try {
    const foundProducts = await Product.find({});
    res.send(foundProducts);
  } catch (err) {
    res.send(err);
  }
}

//Create operation for creating a product

module.exports.create = async function(req, res) {
  const newProduct = new Product({
    name: req.body.name,
    quantity: req.body.quantity
  });

  try {
    await newProduct.save();
    res.send('New product added successfully.');
  } catch (err) {
    res.send(err);
  }
}


//To perform delete operation

module.exports.delete = async function(req, res) {
  try {
    const productId = req.params.productID;

    // Delete the product by its ObjectId
    const result = await Product.deleteOne({ _id: productId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Product not found or already deleted' });
    }

    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//To perform update operation
module.exports.updateQuantity = async function(req, res) {
  const ID = req.params.productID;

  try {
    // Find the product using ID
    const found = await Product.findById(ID);

    if (!found) {
      return res.status(404).send({ message: 'Product not found' });
    }

    // Calculate new quantity
    const newQty = parseInt(found.quantity) + parseInt(req.query.number);

    // Update the product's quantity
    const updatedProduct = await Product.findByIdAndUpdate(ID, { quantity: newQty }, { new: true });

    res.json({
      product: updatedProduct,
      message: 'Updated successfully'
    });
  } catch (error) {
    console.error('Error updating quantity:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
  
  