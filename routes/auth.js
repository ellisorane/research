require('dotenv').config();
const express = require('express');
const passport = require('passport')
const { Strategy } = require('passport-google-oauth20');
const { authenticate } = require('../middleware');
const app = express();
const cookieSession = require('cookie-session');

// Save the session to the cookie 
passport.serializeUser((user, done) => {
    done(null, user);
});

// Read the session from the cookie
passport.deserializeUser((object, done) => {
    done(null, object);
});

app.use(
    cookieSession({
        name: "session",
        keys: [process.env.COOKIE_KEY_1, process.env.COOKIE_KEY_2],
        // In milliseconds
        maxAge: 24*60*60*1000,
    })
);

app.use(passport.initialize());
app.use(passport.session());


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
    done(null, user);
});

// Remove the session from the cookie
passport.deserializeUser((user, done) => {
    done(null, user);
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

    console.log("This is the user for google: ", googleProfile)
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
