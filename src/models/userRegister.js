const {Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');


const UserRegisterSchema = new Schema({
    name: String,
    lastname: String,
    phone: String,
    email: String,
    password: String,
    role: String
});

UserRegisterSchema.methods.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
};


module.exports = model('UserRegister', UserRegisterSchema)
