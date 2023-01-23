require('dotenv').config()
const bcrypt = require('bcrypt')
const express = require('express');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../models/User');
const { authenticate } = require('../middleware')
const { body, validationResult } = require('express-validator');

const router = express.Router();


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
        // const { name, email, password } = JSON.parse( req.body.form );
        const { name, institution, email, password } = req.body;

        // Create new user in the database
        const user = await User.create({
            name,
            institution,
            email,
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
    // const { email, password } = JSON.parse( req.body.form );
    const { email, password } = req.body;
    console.log(email, password);
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


// @route   DELETE /user/delete/:id
// @desc    Delete User
// @access  Private
router.delete('/delete/:id', authenticate, async(req, res) => {
    const id = req.params.id
    try {
        const user = await User.findByIdAndDelete( id )
        res.send( 'User deleted successfully.' ) 
    } catch (error) {
        res.send( error )
    }
})



module.exports = router;
