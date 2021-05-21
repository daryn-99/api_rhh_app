const {Router} = require('express')
const router = Router();

const User = require('../models/userModel')
const UserRegister = require('../models/userRegister')
const verifyToken = require('./verifyToken')

const jwt = require('jsonwebtoken')
const config = require('../config')

router.post('/signup', async(req, res) => {
    try {
        const {name, lastname, phone, email, password, role } = req.body;

        const user = new UserRegister({
            name,
            lastname,
            phone, 
            email,
            password,
            role
        });
        user.password = await user.encryptPassword(password);
        await user.save();

        const token = jwt.sign({id: user.id }, config.secret, {
            expiresIn: '24h'
        });
        res.status(200).json({ auth: true, token});
    } catch (e) {
        console.log(e)
        res.status(500).send('Hubo un problema al momento de registrar');
    }
});

router.post('/signin', async(req, res) => {
    try{
        const user = await UserRegister.findOne({ email: req.body.email })
        if (!user) {
            return res.status(404).send('El email no existe')
        }
        const validPassword = await (req.body.password, user.password)
        if (!validPassword) {
            return res.status(401).send({ auth: false, token: null })
        }
        const token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: '24h'
        })
        res.status(200).json({auth: true, token })
    } catch (e) {
        console.log(e)
        res.status(500).send('Email o contraseña incorrectos');
    }
})

router.get('/logout', function(req, res ){
    res.status(200).send({auth: false, token: null})
})

module.exports = router;