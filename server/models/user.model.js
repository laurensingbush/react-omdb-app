const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        maxlength: 50,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        minlength: 7,
        required: true
    }, 
    token: {
        type: String
    }
})

// hash the password before saving the user model
userSchema.pre('save', async function(next) {
    let user = this;
    if (user.isModified('password')) {
        try {
            user.password = await bcrypt.hash(user.password, saltRounds);
            next();
        } catch(error) {
            return next(error)
        } 
    } else {
        next();
    }
});

// compare hashed password to user password
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

// generate a token for the user
userSchema.methods.generateToken = async function() {
    const user = this;
    const token = jwt.sign(user._id.toHexString(), process.env.JWT_SECRET);
    user.token = token;
    await user.save();
    return user;
}

// find token to check whether user is logged in or not
userSchema.statics.findByToken = function(token, callback) {
    const user = this;

    jwt.verify(token, process.env.JWT_SECRET, function(error, decoded) {
        user.findOne({'_id': decoded, 'token': token}, function(error, user) {
            return error ? callback(error) : callback(null, user);
        })
    })
}

module.exports = mongoose.model('User', userSchema);