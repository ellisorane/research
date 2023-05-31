require('dotenv').config()
const jwt = require('jsonwebtoken')

// Middleware
const authenticate = (req, res, next) => {
    // Regular authentication
    const token = req.headers['x-access-token']
    if(!token) {
        return res.status(401).json({ message: 'Unauthorized' })
        // return res.status(401).json({ message: 'Not token found.' })
    } else if(token) {

        // Verify Token
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                return res.status(403)     
            }
    
            req.user = decoded
            next()
        });
    }

    // Google authentication
    const isLoggedIn = false;
    if(!isLoggedIn) {
        return res.status(403).json({message: 'You must be logged in'});
    } else if(isLoggedIn) {

        next();
    }

}


module.exports = {
    authenticate
}