const User = require('../models/user');

const ErrorHandler = require('../utils/errorhandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const sendToken = require('../utils/jwtToken');

//Register a user  localhost:PORT//register
exports.registerUser = catchAsyncError( async (req, res, next) => {
    
    console.log('Create User Event Called');

    const { name, email, number, password } = req.body

    const user = await User.create({
        name,
        email,
        number,
        password
    })

    sendToken(user, 200, res)
})

// Login User localhost:4000/login
exports.loginUser = catchAsyncError( async (req, res, next) => {
    
    console.log("Login Event called");

    const { email, password } = req.body

    if( !email || ! password) {
        return next(new ErrorHandler('Please Enter Email & Password', 400));
    }

    const user = await User.findOne({ email }).select('+password')
    if(!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }

    const isPasswordMatched = await user.comparePassword(password); 
    if(!isPasswordMatched) {
        return next( new ErrorHandler('Invalid Password', 401));
    }

    sendToken(user, 200, res)

    console.log({sucess: true, user, token});
})

// Logout User localhost:4000/logout
exports.logoutUser = catchAsyncError( async (req, res, next) => {
    
    console.log("logout Event Called");

    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        sucess: true,
        message: "Logged Out"
    })
})
