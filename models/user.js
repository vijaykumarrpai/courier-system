const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('email-validator');
const smpp = require('smpp');

// Define collection and schema for user
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    minlength: 4,
    maxlength: 64
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: {
      validator: function(value) {
        return validator.validate(value);
      },
      message: function() {
        return 'Invalid email format'
      }
    }
  },
  mobno: {
    type: Number,
    unique: true,
    required: true,
    minlength: 10,
    maxlength: 13
  },
  address: {
    type: String,
    required: true,
    maxlength: 120
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 64
  },
  passwordConf: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 64
  }
});

// Authenticating whether user exist or not
UserSchema.statics.authenticate = function (email, password, callback) {
  User.findOne({ email: email })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}
// Storing the user password and hashing it
UserSchema.pre('save', function(next) {
    let user = this;
    bcrypt.genSalt(10).then((salt) => {
        bcrypt.hash(user.password, salt).then((encryptedPassword) => {
            user.password = encryptedPassword;
            next();
        });
    })
});

// Storing the password confirmation and hashing it
UserSchema.pre('save', function(next) {
    let user = this;
    bcrypt.genSalt(10).then((salt) => {
        bcrypt.hash(user.passwordConf, salt).then((encryptedPassword) => {
            user.passwordConf = encryptedPassword;
            next();
        });
    })
});

var User = mongoose.model('User', UserSchema);
module.exports = User;
