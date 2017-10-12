const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  pic_path: {
    type: String,
    default: '/uploads/profile.jpg'
  }
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.asData = function() {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    pic_path: this.pic_path
  };
};

const User = mongoose.model('User', UserSchema);

module.exports = {
  User
};
