const express = require('express');

const mongoose = require('mongoose');

const Product = require('./models/product.js');

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
//routes

//index
app.get('/products', (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            products: allProducts,
        })
    })
})

//New
app.get('/products/new', (req, res) => {
    res.render('new.ejs')
})

//delete

app.delete('/products/:id', (req, res) =>{
    Product.findByIdAndRemove(req.params.id, (err, data) =>{
        res.redirect('/products')
    });
});

//Create
app.post('/products', (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
        res.redirect('/products')
    })
})

//show
app.get('/products/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) =>{
        res.render('show.ejs' , {
            product: foundProduct,
        })
    })
})






const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening at ${PORT}`))