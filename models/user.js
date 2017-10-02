const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  email: {
    type: String,
    index: { unique: true }
  },
  username:     String,
  password: String,
  city: String,
  facebookID: String,
  googleID: String,
  pic_path: {
    type: String,
    default: '/images/profile-default.jpg'
  },
  votes: {
    type: Array,
    items: String
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
