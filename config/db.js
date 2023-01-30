require('dotenv').config()
const mongoose = require('mongoose');

const connectDB = async () => {
    try {

        mongoose.set('strictQuery', true)
        await mongoose.connect(process.env.MONGO_URI)
        
        console.log('MongoDB connected......');
    } catch (err) {
        console.error('Failed to connect to db')
        console.error(err.message);
        process.exit(1);
    } 
}

module.exports = connectDB;
