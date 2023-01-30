require('dotenv').config()
const bcrypt = require('bcrypt')
const express = require('express');
const jwt = require('jsonwebtoken')
// const mongoose = require('mongoose')
const User = require('../models/User');
const { authenticate } = require('../middleware')

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

// Save image to memory instead of to disk
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////


// @route   GET /user/test
// @desc    Testing the user/ route
// @access  Public
router.get('/test', async(req, res) => {
    try {
        res.json( 'User test route is working' )
    } catch ( error ) {
        console.error( error )
        res.json( error )
    }
})


// @route   GET /user/
// @desc    Get User
// @access  Private
router.get('/', authenticate, async(req, res) => {
    try {
        res.json(req.user)
    } catch (error) {
        console.error(error)
        res.json(error)
    }
});

// @route   POST /user/signup
// @desc    Create User
// @access  Public
router.post('/signup', async(req, res) => {

    try {    
        const { email, name, institution, password } = req.body
        // const { name, institution, email, password } = req.body;
        // console.log( email, name, institution, password )
        // Create new user in the database
        const user = await User.create({
            email,
            name,
            institution,
            password 
        })

        // // Create JWT token 
        const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1d' })

        // Send token and user to client and set to current user
        res.json({
            token: token,
            user: user
        })

    } catch ( error ) {

        res.json( error  )
        console.error( 'Error from /signup: ', error )

    }

});


// @route   POST /user/login
// @desc    Login User
// @access  Public
router.post('/login', async ( req, res ) => {
    const { email, password } = req.body;
    
    try {
        // Find user in database with email
        let user = await User.findOne({ email })

        // User not found
        if( user === null ) {
            // Production env
            // return res.status( 404 ).send( 'Incorrect credentials' )
            // Dev environment
            return res.json({ error: 'User not found' } )
        }

        // Compare password of user in database and the user trying to login
        if( await bcrypt.compare( password, user.password ) ) {
            // Create JWT token
            const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1d' })

            // Password match send token and user to client and set to current user
            res.json({
                token: token,
                user: user
            })

        } else {
            // Production env
            // return res.status(404).send('Incorrect credentials')
            // Dev environment
            return res.json({ error: 'Wrong password' })
        }

    } catch ( error ) {
        console.error( 'Error from /login: ', error )
        res.json( error )
    }
})

// @route   PUT /user/update-user
// @desc    Update User
// @access  Private
router.put('/update-user/:id', authenticate, async ( req, res ) => {
    const newData = req.body
    const id = req.params.id

    try {
        // Find and update user by _id
        const user = await User.findByIdAndUpdate( id, newData, { new: true } );

        // User not found
        if(user === null) {
            return res.status( 404 ).send( 'User not found' );
        }

        res.json( user )
        
    } catch (error) {
        console.error( 'Error from /update-user: ',error )
        res.json( error )
    }
})

// @route   PUT /user/password/:id
// @desc    Update User password
// @access  Private
router.put('/password/:id', authenticate, async ( req, res ) => {
    const currentPassword = req.body.currentPassword
    const newPassword = req.body.newPassword
    const id = req.params.id
    try {
        // Find user in database with currentUser _id
        const user = await User.findById( id ).exec();
        
        // If currentPassword matches password in database then update currentPassword with newPassword
        if( await bcrypt.compare( currentPassword, user.password ) ) {
            const hashedNewPassword = await bcrypt.hash( newPassword, 10 )
            const updatedUser = await User.findByIdAndUpdate( id, { password: hashedNewPassword }, { new: true } )
            console.log( "Password updated" )
            res.json( updatedUser )
        } else {
            res.status( 404 ).send( 'Incorrect credentials' )
        }
        
    } catch ( error ) {
        res.send( error )
    }
})

// @route   PUT /user/userImg/:id
// @desc    Update User avatar
// @access  Private
router.put('/userImg/:id', [ upload.single( 'userImg' ), authenticate ], async ( req, res ) => {
    
    // console.log(req.file)

    try {
        const userImg = uuidv4() + "-" + req.file.originalname;
        console.log(userImg)
        console.log( req.params.id )
    
        const s3Params = {
            Bucket: bucketName,
            Key: userImg,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        }
        
        const command = await new PutObjectCommand(s3Params);
        // Set userImgUrl
        const getObjectParams = {
            Bucket: bucketName,
            Key: userImg,
        }
        
        const command2 = await new GetObjectCommand(getObjectParams);
        const expiration = 60 * 60 * 24 * 2; // 2 days
        const userImgUrl = await getSignedUrl(s3, command2, { expiresIn: expiration })
        
        const user = await User.findByIdAndUpdate( req.params.id, { userImg, userImgUrl }, { new: true } )

        s3.send(command);
        user.save();

        // Create new JWT token
        const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1d' })

        // Password match send token and user to client and set to current user
        res.json({
            token: token,
            user: user
        })
        
    } catch(err) {
        console.error("Error: ", err.message);
        res.status(500).send('Server Error');
    }
})


// @route   DELETE /user/delete/:id
// @desc    Delete User
// @access  Private
router.delete('/delete/:id', authenticate, async(req, res) => {
    const id = req.params.id
    try {
        // Delete User in mongodb
        const user = await User.findByIdAndDelete( id )

        // Delete user avatar in s3
        const s3Params = {
            Bucket: bucketName,
            Key: user.avatar
        }
        const command = new DeleteObjectCommand(s3Params);

        if(!project) res.status(404).json({ msg: "Project not found"});

        await s3.send(command);

        res.send( 'User deleted successfully.' ) 
    } catch (error) {
        res.send( error )
    }
})



module.exports = router;
