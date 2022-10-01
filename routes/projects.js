require('dotenv').config();
const express = require('express');
const Project = require('../models/Projects');
const router = express.Router();

///////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
// S3 setup /////////////////////////////////////////////////////////////////////////
const { v4: uuidv4 } = require('uuid');
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const region = "us-east-1";
const bucketName = "research.com-bucket";
const accessKeyId = process.env.aws_access_key_id;
const secretAccessKey = process.env.aws_secret_access_key;

const s3 = new S3Client({
    credentials: {
        accessKeyId,
        secretAccessKey
    },
    region
});

const multer = require('multer');
const User = require('../models/User');

// Save image to memory instead of to disk
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////


// @route   GET /projects
// @desc    Get all projects
// @access  Public
router.get('/', async(req, res) => {
    try {
        const projects = await Project.find();
        
        for(const project of projects) {
            const getObjectParams = {
                Bucket: bucketName,
                Key: project.image,
            }

            const command = new GetObjectCommand(getObjectParams);
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

            const proj = await Project.updateOne({ _id: project._id}, { $set: { imageURL: url } } );
        }

        res.send(projects);
    } catch(err) {
        console.error(err.message);
    }
});

// @route   POST /projects/addProject
// @desc    Create project
// @access  Public
router.post('/addProject', upload.single('image'), async(req, res) => {

    const { title, description, researchers, institution, fundingGoal, daysToFund, category } = JSON.parse(req.body.formText);
    const image = uuidv4() + "-" + req.file.originalname;
    const s3Params = {
        Bucket: bucketName,
        Key: image,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    }

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
        
        const command = await new PutObjectCommand(s3Params);

        await s3.send(command);
        await project.save();

        res.json(project);
        
    } catch(err) {
        console.error("Error: ", err.message);
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

        const s3Params = {
            Bucket: bucketName,
            Key: project.image
        }
        const command = new DeleteObjectCommand(s3Params);

        if(!project) res.status(404).json({ msg: "Project not found"});

        // Delete project image in s3
        await s3.send(command);
        // Delete project in mongoDB
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
    } catch(err) {
        console.error(err.message);
    }
});



module.exports = router;
