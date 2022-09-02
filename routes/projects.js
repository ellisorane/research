const express = require('express');
const Project = require('../models/Projects');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const multer = require('multer');
const { text } = require('express');
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

    const { title, description, researchers, institution, fundingGoal, daysToFund, category } = JSON.parse(req.body.formText);
    const image = req.file.filename;
    try {
        const project = await new Project({ 
            title: title, 
            description: description, 
            researchers: researchers, 
            institution: institution,
            fundingGoal: fundingGoal, 
            daysToFund: daysToFund,
            daysLeft: daysToFund,
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

// @route   GET /projects/:id
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

// @route   DELETE /projects/:id
// @desc    Delete project by ID
// @access  Public
router.delete('/:id', async(req, res) => {
    try {

        const project = await Project.findById(req.params.id);
        if(!project) res.status(404).json({ msg: "Project not found"});
        await project.remove();
        res.json({msg: "Project removed"});

    } catch(err) {
        console.error(err.message);
    }
});

// @route   POST /projects/daysLeft/:id
// @desc    Update daysLeft on a project
// @access  Public
router.post('/daysLeft/:id', async(req, res) => {
    try {
        // Update user
        const project = await Project.updateOne( { _id: req.params.id }, { $set: { daysLeft: req.body.daysLeft } } );
        res.json(project);
    } catch(err) {
        console.error(err.message);
    }
});

// @route   POST /projects/payment/:id
// @desc    Fund a project
// @access  Public
router.post('/payment/:id', async(req, res) => {
    try {
        // Update user
        const project = await Project.updateOne( { _id: req.params.id }, { $set: { amountFunded: parseInt(req.body.amountFunded) + parseInt(req.body.amount) }, fundedByUser: true } );
        res.json(project);
        // console.log(req.params.id);
        // console.log('payment: ', req.body.amount);
    } catch(err) {
        console.error(err.message);
    }
});



module.exports = router;
