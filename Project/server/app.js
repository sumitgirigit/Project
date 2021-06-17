
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')

const errorMiddleware = require('./middlewares/error')
app.use(express.json());
app.use(cookieParser());
 
//importing all routes
const auth = require('./routes/auth');
const products = require('./routes/product');

//
app.use('/', auth)
app.use('/', products)

// Middleware to handle error
app.use(errorMiddleware);

module.exports = app