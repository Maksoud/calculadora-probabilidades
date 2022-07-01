const Log        = require("./class/Logs");
// const Decimals   = require("./class/Decimals");
const Strategies = require("./class/Strategies");

/***********************************************************/

let operacao = {
    entrada: 0,
    soma:    0,
    retorno: 0,
    lucro:   0
};

let resultado = {
    duz1:   [],
    duz2:   [],
    duz3:   [],
    result: [],
    ents:   [],
    banca:  0
};

/***********************************************************/

function jogar(modalidade, nentrada) {

    // Aguarda os 9 útimos números sorteados para iniciar a análise probabilística
    if (numeros.length >= 12) {

        switch (modalidade) {

            // 'duzias', 'linhas', 'metades', 'pares-ímpares', 'vermelho-preto'
            case 'duzias':

                Log.success('duzias');
                Strategies.duzias({numeros, nentrada, resultado});

                break;
            case 'linhas':
                Log.success('linhas');
                break;
            case 'metades':
                Log.success('metades');
                break;
            case 'pares-ímpares':
                Log.success('pares-ímpares');
                break;
            case 'vermelho-preto':
                Log.success('vermelho-preto');
                break;
            default:
                Log.warning('Não reconhecido');
                break;

        }// switch (modalidade)

    } else {
        Log.warning("Aguardando demais números", numeros);
    }// if (numeros.length >= 12)

}// function jogar(numeros)

/***********************************************************/

function addNumero(num) {

    if (typeof numeros == "undefined") numeros = [];

    /************/

    if (Array.isArray(num)) {
        num.forEach( n => {
            numeros.push(n);
        })
    } else {
        numeros.push(num);
    }// else if (num.isArray())

    /************/

    // Elimina números antigos
    while (numeros.length > 12) {
        numeros.shift();
    }// while (numeros.length > 12)

}// addNumero

function addBanca(num) {

    resultado.banca = num;

}// addBanca

function getBanca() {

    return resultado.banca;

}// getBanca

function getResultado() {

    return resultado;

}// getResultado

/***********************************************************/

module.exports = {
    jogar:        jogar,
    addNumero:    addNumero,
    addBanca:     addBanca,
    getBanca:     getBanca,
    getResultado: getResultado,
};