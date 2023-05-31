require('dotenv').config();
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose')
const User = require('../models/User');
const { authenticate } = require('../middleware');
const { Validator } = require('node-input-validator');

const router = express.Router();

///////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////
// S3 setup /////////////////////////////////////////////////////////////////////////
const { v4: uuidv4 } = require('uuid');
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const region = "us-east-1";
const bucketName = "research.com-bucket";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

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


// @route   GET /user/userImgUrl/:id
// @desc    Get user image for project display and refresh user image if necessary
// @access  Public
router.get('/userImgUrl/:id', async(req, res) => {
    try {
        // Refresh  user images after a certain time period
        const users = await User.find();
        // console.log(users);

        // If userImgUrlCreationDate is 1 days ago or older then refresh the user image url
        for(const user of users) {
                
            let oldimageURLCreationDate = user.userImgUrlCreationDate
            let newimageURLCreationDate = Date.now()
            let timeDiff =  (newimageURLCreationDate - oldimageURLCreationDate) / (1000 * 60 * 60 * 24)
            // console.log(timeDiff, " minutes")
    
            if (timeDiff >= 1 && user.userImg) {
                // console.log("user image url refresh working")
                const getObjectParams = {
                    Bucket: bucketName,
                    Key: user.userImg,
                }
    
                const command = await new GetObjectCommand(getObjectParams);
                const expiration = 60 * 60 * 24 * 2; // 2 days
                const url = await getSignedUrl(s3, command, { expiresIn: expiration });
    
                await User.updateOne({ _id: user._id}, { $set: { userImgUrl: url, userImgUrlCreationDate: Date.now() } } );
            }
            
        }

        let user = await User.findOne({ _id: req.params.id }).select( 'userImgUrl' )
        // console.log( user )
        res.json( user )
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
})


// @route   POST /user/signup
// @desc    Create User
// @access  Public
router.post('/signup', async(req, res) => {

    try {    
        const { email, name, institution, password } = req.body
        // Create new user in the database
        const user = await User.create({
            email,
            name,
            institution,
            password 
        })

        // // Create JWT token - Expires every 48 hours
        const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '2d' })

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
            // Refresh and update userImg - aws urls need to be updated because they expire after a certain amount of time
            // let refreshedUser = null
            if( user.userImg ) {
                const getObjectParams = {
                    Bucket: bucketName,
                    Key: user.userImg,
                }
                
                const command = await new GetObjectCommand(getObjectParams);
                const expiration = 60 * 60 * 24 * 4; // 4 days
                const userImgUrl = await getSignedUrl(s3, command, { expiresIn: expiration })
                
                user = await User.findByIdAndUpdate( user._id, { userImgUrl }, { new: true } )
                // const refreshedUser = await User.findByIdAndUpdate( user._id, { userImgUrl }, { new: true } )
                // refreshedUser.save();
            }


            // Create JWT token - Expires every 48 hours
            // const token = jwt.sign({ user: refreshedUser || user }, process.env.JWT_SECRET, { expiresIn: '2d' })
            const token = jwt.sign({ user: user }, process.env.JWT_SECRET, { expiresIn: '2d' })

            // Password match send token and user to client and set to current user
            res.json({
                token: token,
                // user: refreshedUser || user
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
router.put('/update-user', authenticate, async ( req, res ) => {

    const newData = req.body
    const id = req.user.user._id
    const { name, institution, email, password, newPassword } = req.body

    console.log(newData)

    let user = null

    
    
    try {

        const validationOptions = { 
            name: "required", 
            institution: "required", 
            email: "email|required", 
            password: "required|minLength:8", 
            newPassword: "required|minLength:8" 
        }

        const validationOptionsNoPassword = { 
            name: "required", 
            institution: "required", 
            email: "email|required"
        }

        // Input validation
        const v = new Validator( req.body, ( password.length || newPassword.length ) ? validationOptions : validationOptionsNoPassword )
        
        // Initiate validation
        const matched = await v.check()

        // Handle validation errors
        if (!matched) {
            // res.status(404);
            throw { errors: v.errors }
        }

        // Find and update user by _id
        if ( password === '' ) {

            user = await User.findByIdAndUpdate( id, { name, institution, email }, { new: true } );
            console.log( 'no password' )
        } else {
            // console.log( password )
            // If currentPassword matches password in database then update currentPassword with newPassword
            if( await bcrypt.compare( password, req.user.user.password ) ) {
                console.log( 'password' )

                const hashedNewPassword = await bcrypt.hash( newPassword, 10 )
                user = await User.findByIdAndUpdate( id, { name, institution, email, password: hashedNewPassword }, { new: true } );
            } else {
                console.log( 'Incorrect credentials' )
            }

        }

        // User not found
        if( user === null ) {
            return res.status( 404 ).send( 'User not found' );
        }

        // Create new JWT token
        const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1d' })

        // Password match send token and user to client and set to current user
        res.json({
            token: token,
            user: user
        })

    } catch ( error ) {
        console.error( 'Error from /update-user: ',error )
        res.json( error )
    }
})



// @route   DELETE /user/userImg
// @desc    Delete User image - used for deleting old user image before adding new user image
// @access  Private
router.delete('/userImg', authenticate, async(req, res) => {

    const userImg = req.user.user.userImg
    console.log( userImg )

    try {
        const deleteObjectParams = {
            Bucket: bucketName,
            Key: userImg
        }

        const deleteCmd = await new DeleteObjectCommand(deleteObjectParams);

        if( userImg === null ) res.status(404).json({ msg: "Image not found"})

        await s3.send(deleteCmd);
        res.json('Old image deleted.')

    } catch (err) {
        console.error("Delete userImg Error: ", err);
        res.status(500).send(err);
    }
})


// @route   PUT /user/userImg
// @desc    Update User avatar
// @access  Private
router.put('/userImg', [ upload.single( 'userImg' ), authenticate ], async ( req, res ) => {
    
    // console.log(req.user)
    const id = req.user.user._id
    // console.log(id)

    try {
        const userImg = uuidv4() + "-" + req.file.originalname;
        // console.log(userImg)
        // console.log( id )
    
        const uploadObjectParams = {
            Bucket: bucketName,
            Key: userImg,
            Body: req.file.buffer,
            ContentType: req.file.mimetype
        }

        const getObjectParams = {
            Bucket: bucketName,
            Key: userImg,
        }
        
        const uploadCmd = await new PutObjectCommand(uploadObjectParams);
        const getCmd = await new GetObjectCommand(getObjectParams);


        // let user = await User.findById( id )

        // Set userImgUrl by getting a signedUrl from aws - must be refreshed at some point
        const expiration = 60 * 60 * 24 * 4; // 4 days
        const userImgUrl = await getSignedUrl(s3, getCmd, { expiresIn: expiration })
        
        const user = await User.findByIdAndUpdate( id, { userImg, userImgUrl }, { new: true } )

        s3.send(uploadCmd);
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


// @route   DELETE /user/delete
// @desc    Delete User
// @access  Private
router.delete('/delete', authenticate, async(req, res) => {
    const id = req.user.user._id
    const userImg = req.user.user.userImg

    try {
        // Delete User in mongodb
        const user = await User.findByIdAndDelete( id )

        // Delete user avatar in s3
        const s3Params = {
            Bucket: bucketName,
            Key: userImg
        }
        const command = new DeleteObjectCommand(s3Params);

        if(!project) res.status(404).json({ msg: "Project not found"});

        // await s3.send(command);

        res.send( 'User deleted successfully.' ) 
    } catch (error) {
        res.send( error )
    }
})



module.exports = router;
