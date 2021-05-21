const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/rhh_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(db => console.log('Conexion establecida'))
