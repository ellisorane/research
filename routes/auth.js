require('dotenv').config();
const express = require('express');
const passport = require('passport')
const { Strategy } = require('passport-google-oauth20');
const { authenticate } = require('../middleware');
const jwt = require('jsonwebtoken');


const User = require('../models/User');

const router = express.Router();

const AUTH_OPTIONS = {
    callbackURL: '/auth/google/callback',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
}

let googleProfile;

const verifyCallback = (accessToken, refreshToken, profile, done) => {
    googleProfile = profile;
    done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// Save the session to the cookie 
passport.serializeUser((user, done) => {
    done(null, user.id);
    // done(null, user);
});

// Read the session from the cookie
passport.deserializeUser((id, done) => {
    // try {
    //     let user = await User.findOne({ googleID: obj.id })

    //     if(!user) {
    //        // Create new user in the database
    //         user = await User.create({
    //             email: obj.emails[0].value,
    //             name: obj.displayName,
    //             password: obj.id,
    //             googleID: obj.id,
    //             userImgUrl: obj.photos[0].value
    //         });

    //     }

    //     // Create JWT token - Expires every 48 hours
    //     const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '2d' })

    //     user = {
    //         token: token,
    //         user: user
    //     }

    //     console.log(user)

    //     done(null, user)

    // } catch (error) {
    //     console.error(error);
    // }
        done(null, id);

});


// Routes //////////////////////////////////////////////////////////////////////////

// @route   GET /auth/googleProfile
// @desc    Get the Google Profile for use on the frontend
// @access  Public
router.get('/googleProfile/', (req, res) => {
    res.json(googleProfile);
});

// @route   GET /auth/google
// @desc    Create User
// @access  Public
router.get('/google/', passport.authenticate('google', {
    scope: ['email', 'profile']
}));


// @route   GET /auth/google
// @desc    Create User
// @access  Public
router.get('/google/', passport.authenticate('google', {
    scope: ['email', 'profile']
}));

// @route   GET /auth/google/callback
// @desc    
// @access  Public
router.get('/google/callback', passport.authenticate('google', {
        failureRedirect: '/auth/failed', // redirect here if login failed
        successRedirect: '/auth/success', // redirect here if login is successful,
        session: true
    }), (req, res) => {
        console.log('Worked', res);
    }
);

// @route   GET /auth/success
// @desc    Authorization Successful
// @access  Public
router.get('/success', (req, res) =>{
    if (process.env.NODE_ENV === 'production') {
        res.redirect('https://research-com.herokuapp.com/')
    } else {
        res.redirect('http://localhost:3000/');
    }

    // console.log("google profile: ", googleProfile)
});


// @route   GET /auth/failed
// @desc    Authorization Failed
// @access  Public
router.get('/failed', (req, res) =>{
    res.status(401).json({error:true,  message: "Login failed"})
});




// @route   GET /auth/logout
// @desc    Logout of google profile
// @access  Public
router.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

module.exports = router;
