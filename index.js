const Log      = require("./class/Logs");
const Decimals = require("./class/Decimals");

/************/

// Receber um vetor com 9 números
// Classificar os números em 3 grupos
// Retornar a probabilidade do próximo número estar dentro de um desses 3 grupos

const col1 = [1,2,3,4,5,6,7,8,9,10,11,12];
const col2 = [13,14,15,16,17,18,19,20,21,22,23,24];
const col3 = [25,26,27,28,29,30,31,32,33,34,35,36];
const lin1 = [1,4,7,10,13,16,19,22,25,28,31,34];
const lin2 = [2,5,8,11,14,17,20,23,26,29,32,35];
const lin3 = [3,6,9,12,15,18,21,24,27,30,33,36];
const met1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
const met2 = [19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36];
const pares = [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36];
const impar = [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35];
const verme = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
const preto = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];
const entra = [1,2.5,5,20,50,100,500,2000,5000];
let analise = {
    col1: [],
    col2: [],
    col3: [],
    result: []
};

let numeros = [25,27,1,13,12,22,35,1,5];
let modalidade = "colunas";
let alavancagem = 1;

calcular(numeros, modalidade, alavancagem);
Log.info("Resultado da Análise: ", getAnalise());

function calcular(numeros, modalidade, alavancagem) {

    // Aguarda os 9 útimos números sorteados para iniciar a análise probabilística
    if (numeros.length >= 9) {

        switch (modalidade) {

            // 'colunas', 'linhas', 'metades', 'pares-ímpares', 'vermelho-preto'
            case 'colunas':
                Log.success('colunas');
                if (alavancagem == 1) {

                    Log.success('alavancagem 1');

                    numeros.forEach( num => {
                        col1.includes(num) ? analise.col1.push(num) : "";
                        col2.includes(num) ? analise.col2.push(num) : "";
                        col3.includes(num) ? analise.col3.push(num) : "";
                    });

                    let countCol1 = analise.col1.length;
                    let countCol2 = analise.col2.length;
                    let countCol3 = analise.col3.length;

                    analise.result[0] = Decimals(countCol1 / (countCol1 + countCol2 + countCol3) * 100, 2);
                    analise.result[1] = Decimals(countCol2 / (countCol1 + countCol2 + countCol3) * 100, 2);
                    analise.result[2] = Decimals(countCol3 / (countCol1 + countCol2 + countCol3) * 100, 2);

                } else if (alavancagem == 2) {
                    Log.success('alavancagem 2');
                } else if (alavancagem == 3) {
                    Log.success('alavancagem 3');
                }// else if (alavancagem == 3)

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

    }// if (numeros.length >= 9)

}// function calcular(numeros)

function getAnalise() {

    return analise;

}// getAnalise

// Controlar o saldo da banca
// Controlar o valor da entrada em cada grupo
// Somar nas vitórias o valor da banca

/************/

module.exports = {
    calcular:   calcular,
    getAnalise: getAnalise,
};