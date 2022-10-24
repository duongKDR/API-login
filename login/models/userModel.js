const mongoose = require('mongoose');

const userModelSchema = new mongoose.Schema({
  username: { type: String, require: true },
  password: { type: String, require: true },
}, {
  timestamps: true,
});

const UserModel = mongoose.model('userModel', userModelSchema)

module.exports = UserModel