const Log        = require("./Logs");
const Decimals   = require("./Decimals");

/************/

const duz1 = [1,2,3,4,5,6,7,8,9,10,11,12];
const duz2 = [13,14,15,16,17,18,19,20,21,22,23,24];
const duz3 = [25,26,27,28,29,30,31,32,33,34,35,36];
const lin1 = [1,4,7,10,13,16,19,22,25,28,31,34];
const lin2 = [2,5,8,11,14,17,20,23,26,29,32,35];
const lin3 = [3,6,9,12,15,18,21,24,27,30,33,36];
const met1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
const met2 = [19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36];
const pares = [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36];
const impar = [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35];
const verme = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
const preto = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];
const ventr = [1,2.5,5,10,10,15,22,33,50,75,113,170];
typeof nentrada ? nentrada = 0 : "";

/************/

function duzias(dados) {

    let numeros   = dados.numeros;
    let resultado = dados.resultado;
    let nentrada  = dados.nentrada;

    /************/
    // Limpa dúzias
    resultado.duz1 = [];
    resultado.duz2 = [];
    resultado.duz3 = [];

    /************/
    // Verifica a dúzia
    numeros.forEach( num => {
        duz1.includes(num) ? resultado.duz1.push(num) : "";
        duz2.includes(num) ? resultado.duz2.push(num) : "";
        duz3.includes(num) ? resultado.duz3.push(num) : "";
    });

    /************/
    // Analisa tamanho da dúzia
    let countDuz1 = resultado.duz1.length;
    let countDuz2 = resultado.duz2.length;
    let countDuz3 = resultado.duz3.length;

    /************/
    // Percentual do tamanho da dúzia
    resultado.result[0] = Decimals(100 - (countDuz1 / (countDuz1 + countDuz2 + countDuz3) * 100), 0);
    resultado.result[1] = Decimals(100 - (countDuz2 / (countDuz1 + countDuz2 + countDuz3) * 100), 0);
    resultado.result[2] = Decimals(100 - (countDuz3 / (countDuz1 + countDuz2 + countDuz3) * 100), 0);

    /************/

    if (typeof resultado.ents[0] == "undefined" && typeof resultado.ents[1] == "undefined" && typeof resultado.ents[2] == "undefined") {

        if (resultado.result[0] > resultado.result[1] && resultado.result[0] > resultado.result[2]) {

            resultado.ents[0] = ventr[nentrada];
            resultado.ents[1] = 0;
            resultado.ents[2] = 0;

            resultado.banca -= ventr[nentrada];

        } else if (resultado.result[1] > resultado.result[0] && resultado.result[1] > resultado.result[2]) {

            resultado.ents[0] = 0;
            resultado.ents[1] = ventr[nentrada];
            resultado.ents[2] = 0;

            resultado.banca -= ventr[nentrada];

        } else if (resultado.result[2] > resultado.result[1] && resultado.result[2] > resultado.result[0]) {

            resultado.ents[0] = 0;
            resultado.ents[1] = 0;
            resultado.ents[2] = ventr[nentrada];

            resultado.banca -= ventr[nentrada];

        } else {

            Log.info("Espera...");

        }// else

    } else {

        typeof resultado.ents[0] > 0 ? resultado.ents[0] += ventr[nentrada] : "";
        typeof resultado.ents[1] > 0 ? resultado.ents[1] += ventr[nentrada] : "";
        typeof resultado.ents[2] > 0 ? resultado.ents[2] += ventr[nentrada] : "";

    }// else if (typeof resultado.ents[0] == "undefined" && typeof resultado.ents[1] == "undefined" && typeof resultado.ents[2] == "undefined")

    // Controlar o saldo da banca
    // Controlar o valor da entrada em cada grupo
    // Somar nas vitórias o valor da banca

}// duzias

/************/

module.exports = {
    duzias: duzias,
};