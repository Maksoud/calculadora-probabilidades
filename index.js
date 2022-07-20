require('dotenv').config()
const app  = require('./src/app');
const port = normalizaPort(process.env.PORT || '3001');

/**********************************/

function normalizaPort(val) {

    const port = parseInt(val, 10);
    
    if (isNaN(port)) {
        return val;
    }// if (isNaN(port))
    
    if (port >= 0) {
        return port;
    }// if (port >= 0)
    
    return false;

}// normalizaPort

/**********************************/

app.listen(port, function () {
    console.log(`Servidor ativo na porta ${port}...`);
})
