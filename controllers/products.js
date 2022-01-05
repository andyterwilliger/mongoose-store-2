const express = require('express');

const productRouter = express.Router();

const Product = require('../models/product.js')
//seed

const productSeed = require('../models/productSeed.js');

productRouter.get('/products/seed', (req, res) => {
	Product.deleteMany({}, (error, allProducts) => {})

	Product.create(productSeed, (error, data) => {
		res.redirect('/products');
	});
});

//index
productRouter.get('/', (req, res) => {
    Product.find({}, (error, allProducts) => {
        res.render('index.ejs', {
            products: allProducts,
        })
    })
})

//New
productRouter.get('/new', (req, res) => {
    res.render('new.ejs')
})

//delete

productRouter.delete('/:id', (req, res) =>{
    Product.findByIdAndRemove(req.params.id, (err, data) =>{
        res.redirect('/products')
    });
});

//Create
productRouter.post('/', (req, res) => {
    Product.create(req.body, (error, createdProduct) => {
        res.redirect('/products')
    })
})

//edit
productRouter.get('/:id/edit', (req, res) => {
    Product.findById(req.params.id, (error, foundProduct) =>{
        res.render('edit.ejs', {
            product: foundProduct,
        });
    });
});

//show
productRouter.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, foundProduct) =>{
        res.render('show.ejs' , {
            product: foundProduct,
        })
    })
})

//exports

module.exports = productRouter;