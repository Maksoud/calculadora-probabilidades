
// const Log    = require("./class/Logs");
// const Roleta = require("./roleta");

/**********************************/

// // Adiciona novos números
// Roleta.addNumero([25,27,2,13,12,9,5,1,22,5,17,21]);
// Roleta.addNumero(11);

// // Modalidade, número da entrada
// let modalidade  = "duzias";

// // Banca inicial
// Roleta.addBanca(1200);

// // Número da entrada
// let nentrada = 0; // começando agora

// // Calcula probabilidade (Números sorteados, modalidade, número da entrada)
// Roleta.jogar(modalidade, nentrada);

// // Exibe resultado
// Log.info("Resultado da Análise: ", Roleta.getResultado());

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