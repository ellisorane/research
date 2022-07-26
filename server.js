const express = require("express");
const path = require('path');
const connectDB = require('./config/db'); 

const app = express();
app.use(express.json({ extended: false }));

// Connect DB
connectDB();

// Allows for req.body use
app.use(express.json({ extended: false }));

// Below are needed to access the uploaded avatar files 
app.use('/static', express.static('public'));
app.use('/uploads', express.static('public/uploads'));

app.get('/', (req, res) => {
    console.log('hi')
    res.send('hi');
})

// Routes 
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

const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
