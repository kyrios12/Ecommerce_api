// importing required packages
const express = require('express');




// initializing express
const app = express();




app.use('/products', require('./routes/products'));


// starting the server
app.listen(3000, function(){
    console.log('API is live on http://localhost:3000/products');
});