const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const auth = require('../middleware/auth');

// GET request for authorized user credentials
router.get('/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName
    });
});

// POST request to register user
router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        const oldUser = await User.findOne({ email }).exec();
        if (oldUser) return res.status(400).json({ success: false, error: 'User already exists' });

        const user = new User({ firstName, lastName, email, password });
        await user.save();
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false , error: error });
    };
});

// POST request to login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).exec();
        if (!user) {
            res.status(401).json({ success: false, error: 'Incorrect email or password' });
        } else {
            const isPasswordCorrect = await user.comparePassword(password);
            if (!isPasswordCorrect) {
                res.status(401).json({ success: false, error: 'Incorrect email or password' });
            } else {
                await user.generateToken();
                res
                    .cookie('token', user.token, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 })
                    .status(200)
                    .json({success: true, userId: user._id});
            }
        }
    } catch (error) {
        res.status(500).json({success: false, error: error });
    };
});

// GET request to logout
router.get('/logout', auth, async (req, res) => {
    try {
        await User.findOneAndUpdate({ _id: req.user._id }, { token: '' }).exec();
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    };
});

module.exports = router;
