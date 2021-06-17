
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorhandler');
const catchAsyncError = require('../middlewares/catchAsyncError');

//create new product
// loclhost:4000/product/new
exports.newProduct = catchAsyncError(async(req, res, next) => {
    
    console.log('Creating New Product');
    
    const product = await Product.create(req.body);

    res.status(201).json({
        sucess: true,
        product
    })
})

// localhost:4000/products
exports.getProducts = catchAsyncError(async(req, res, next ) => {
    
    console.log("Fetching All Products");

    const products = await Product.find();

    res.status(200).json({
        sucess: true,
        count: products.length,
        products
    })
})