
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const catchAsyncError = require('../middlewares/catchAsyncError');
const ErrorHandler = require('../utils/errorhandler');

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    
    const { token } = req.cookies

    console.log(token);

    if(!token) {
        return next(new ErrorHandler('Login first to access this resourse.', 401))
    }
    
    
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decode);
    req.user = await User.findById(decode.id);
    console.log('User Token Authentication Sucessfull');
    
    next()

})