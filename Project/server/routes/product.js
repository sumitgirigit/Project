const express = require('express')


const router = express.Router();

const { getProducts, newProduct } = require('../controllers/productController')
const { isAuthenticatedUser } = require('../middlewares/authUserToken')


router.route('/product/get').get(isAuthenticatedUser, getProducts);
router.route('/product/create').post(isAuthenticatedUser, newProduct);

module.exports = router;