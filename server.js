const express = require('express');

const mongoose = require('mongoose');

//const Product = require('./models/product.js');

const methodOverride= require("method-override");

const app = express();

require('dotenv').config();


//Database connection
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//Database error/success

const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

//middleware
app.use(express.urlencoded({
    extended: true
}));

app.use(methodOverride('_method'));

//Routes

const productsController = require('./controllers/products');
app.use('/products', productsController);

//Listener

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening at ${PORT}`))