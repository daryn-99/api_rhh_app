const {Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    username: String,
    email: String,
    password: String
});

UserSchema.methods.validatePassword = function(password){
    return bcrypt.compare(password, this.password)
};

module.exports = model('User', UserSchema)
