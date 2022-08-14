const express = require('express');
const Project = require('../models/Projects');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const multer = require('multer');
const multerStorage = multer.diskStorage({ 
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1];
        // cb(null, `user-${req.user.id}-${Date.now()}.${ext}`)
        cb(null, `user-test-${Date.now()}.${ext}`)
    }
});
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        return cb(new Error('Only images allowed!', 400), false);
    }
}
const upload = multer({ storage: multerStorage, fileFilter: multerFilter });


// @route   GET /projects
// @desc    Get all projects
// @access  Public
router.get('/', async(req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch(err) {
        console.error(err.message);
    }
});

// @route   POST /projects/addProject
// @desc    Create project
// @access  Public
router.post('/addProject', [upload.single('image')], async(req, res) => {

    const { title, description, researchers, fundingGoal, daysToFund, category } = JSON.parse(req.body.formText);
    const image = req.file.filename;
    try {
        const project = await new Project({ 
            title: title, 
            description: description, 
            researchers: researchers, 
            fundingGoal: fundingGoal, 
            daysToFund: daysToFund,
            amountFunded: 0, 
            category: category,
            image: image
        });
        await project.save();

        res.json(project);
        
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /projects
// @desc    Get project by ID
// @access  Public
router.get('/:id', async(req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if(!project) res.status(404).json({ msg: "Project not found"});
        res.json(project);
    } catch(err) {
        console.error(err.message);
    }
});

module.exports = router;
