const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// @route   GET /user
// @desc    Get User
// @access  Public
router.get('/', async(req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch(err) {
        console.error(err.message);
    }
});

// @route   POST /user/addUser
// @desc    Create User
// @access  Public
router.post('/addUser', [body('name', 'Name must be more than 3 chars').isLength({min: 3})], async(req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    try {
        const user = await new User({ name });
        await user.save();
        res.send('User Registered: ' + name);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
