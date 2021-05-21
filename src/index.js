const app = require('./app')
require('./connection')

async function init(){
    await app.listen(3000, (err) => {

        if ( err ) throw new Error(err);

        console.log('Server on port:3000');
    })
    
}

init();