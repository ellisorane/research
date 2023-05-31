require('dotenv').config()
const path = require('path');
const express = require("express");
const connectDB = require('./config/db'); 
const bodyParser = require('body-parser');
const passport = require('passport')
const cors = require('cors');
const cookieSession = require('cookie-session');

const app = express();

connectDB();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET, POST, PUT, DELETE",
        credentials: true
    })
);

// Below are needed to access the uploaded avatar files 
app.use('/static', express.static('public'));
app.use('/uploads', express.static('public/uploads'));


// Routes 
app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/projects', require('./routes/projects'));

// For Heroku deploy
// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('/*', (req, res) => {
        // res.sendFile(path.resolve(_dirname, 'client', 'build', 'index.html'));
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'), (err) => {
            if(err) {
                res.status(500).send(err);
            }
        });
    });
}

;
const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));