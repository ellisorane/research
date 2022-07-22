const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: 'Dr. Current-User'
    }
});

module.exports = User = mongoose.model('user', UserSchema);