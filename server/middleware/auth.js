const User = require('../models/user.model');

// check if user is logged in or not
const auth = (req, res, next) => {
    
    let token = req.cookies.token;

    User.findByToken(token, (error, user) => {
        if (error) throw error;
        if (!user) {
            return res.json({
                isAuth: false,
                error: 'Unauthorized user'
            });
        };

        req.token = token;
        req.user = user;
        next();
    });
};

module.exports = auth;