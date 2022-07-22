const express = require('express');
const Project = require('../models/Projects');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// @route   GET /projects
// @desc    Get all projects
// @access  Public
router.get('/', async(req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch(err) {
        console.error(err.message);
    }
});

// @route   POST /user
// @desc    Create User
// @access  Public
router.post('/addProject', 
[
    body('name', 'Name must be more than 3 chars').isLength({min: 3}),
], async(req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, researchers, fundingGoal, category, tags, image } = req.body;
    try {
        const project = await new Project({ name, description, researchers, fundingGoal, category, tags, image });
        await project.save();
        res.send('Project created: ' + name);
    } catch(err) {
        console.error(err.message);
        res.status(500).send(errors);
    }
});

module.exports = router;
