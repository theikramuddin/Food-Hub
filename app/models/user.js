const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema

const userSchema =new Schema ({
    name: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    role: {type: String, default: 'customer'}
}, {timestamps: true});

userSchema.methods.isValidPassword = async function (password) {
    return bcrypt.compare(password, this.password);
  };

module.exports = mongoose.model('User', userSchema); 