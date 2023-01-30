const bcrypt = require('bcrypt')
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email required"],
    unique: true
  }, 
  name: {
      type: String,
      required: [true, "Name required"],
  }, 
  password: {
      type: String,
      required: [true, "Password required"],
      validate: {
          validator: function(value) {
            return value.length >= 8;
          },
          message: 'Password must be at least 8 characters long.'
      },
      // set: value => bcrypt.hashSync(value, 10)
  },
  institution: {
      type: String
  },
  userImg: {
      type: String
  },
  userImgUrl: {
    type: String
  },
  createdAt: {
      type: Date,
      default: () => Date.now(),
      immutable: true
  }
})

// Check password validity before hasing it
UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) {
      return next(err);
    }
    this.password = hash;
    next();
  });
});

//Check if email is already in use
UserSchema.plugin(uniqueValidator, { message: 'This {PATH} is already in use.' });

module.exports = User = mongoose.model('user', UserSchema);