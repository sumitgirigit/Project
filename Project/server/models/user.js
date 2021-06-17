const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Schema for new user

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 character']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail,'Please enter valid Email Address']
    },
    number: {
        type: Number,
        required: true,  
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Password must be 8 character'],
        select: false
    }
})

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 8)
})

// Compare User Password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// return JWT Token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

module.exports = mongoose.model('User', userSchema);