const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    user: {
        // References a user ID from the User model
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        // required: true
        // unique: true
    },
    description: {
        type: String,
        // required: true
    },
    researchers: {
        type: String,
        // required: true
    },
    fundingGoal: {
        type: Number,
        // required: true
    },
    daysToFund: {
        type: Number,
        default: 30
    },
    amountFunded: {
        type: Number
    },
    category: {
        type: String,
        // required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    }
});

module.exports = Project = mongoose.model('project', ProjectSchema);