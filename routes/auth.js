require('dotenv').config();
const express = require('express');
const passport = require('passport')
const { Strategy } = require('passport-google-oauth20');

const router = express.Router();

const AUTH_OPTIONS = {
    callbackURL: '/auth/google/callback',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
}

const verifyCallback = (accessToken, refreshToken, profile, done) => {
    console.log('Google profile', profile);
    done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));

// Save the session to the cookie
passport.serializeUser((user, done) => {
    done(null, user)
});

// Remove the session from the cookie
passport.deserializeUser((user, done) => {
    done(null, user)
});


// Routes //////////////////////////////////////////////////////////////////////////

// @route   GET /auth/google
// @desc    Create User
// @access  Public
router.get('/google/', passport.authenticate('google', {
    scope: ['email', 'profile']
}));

// @route   GET /auth/google/callback
// @desc    Create User
// @access  Public
router.get('/google/callback', passport.authenticate('google', {
        failureRedirect: '/failed', // redirect here if login failed
        successRedirect: '/', // redirect here if login is successful,
        session: false
    }), (req, res) => {
        console.log('Worked');
    }
);

// @route   GET /auth/failed
// @desc    Authorization Failed
// @access  Public
router.get('/failed', (req, res) =>{
    res.status(401).json({error:true,  message: "Login failed"})
});



// @route   GET /user/logout
// @desc    Create User
// @access  Public
router.get('/logout', async(req, res) => {
    req.logout();
});

module.exports = router;
