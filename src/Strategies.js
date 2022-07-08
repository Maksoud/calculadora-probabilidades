const Log      = require("./Logs");
const Decimals = require("./Decimals");

/************/

const duz   = [];
    duz[0]  = [1,2,3,4,5,6,7,8,9,10,11,12];
    duz[1]  = [13,14,15,16,17,18,19,20,21,22,23,24];
    duz[2]  = [25,26,27,28,29,30,31,32,33,34,35,36];
const col   = [];
    col[0]  = [1,4,7,10,13,16,19,22,25,28,31,34];
    col[1]  = [2,5,8,11,14,17,20,23,26,29,32,35];
    col[2]  = [3,6,9,12,15,18,21,24,27,30,33,36];
const met   = [];
    met[0]  = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
    met[1]  = [19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36];
const pares = [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36];
const impar = [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35];
const verme = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
const preto = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];
const ventr = [1,2.5,5,10,10,15,22,33,50,75,113,170];

/************/

exports.duzias = (dados) => {

    let res = {
        duzias:  [],
        percDuz: [],
    };

    // console.log("dados.numeros", dados.numeros);

    /************/

    // Separa cada número sorteado em dúzias
    dados.numeros.forEach( num => {
        typeof res.duzias[0] == "undefined" ? res.duzias[0] = [] : "";
        typeof res.duzias[1] == "undefined" ? res.duzias[1] = [] : "";
        typeof res.duzias[2] == "undefined" ? res.duzias[2] = [] : "";
        duz[0].includes(num) ? res.duzias[0].push(num) : "";
        duz[1].includes(num) ? res.duzias[1].push(num) : "";
        duz[2].includes(num) ? res.duzias[2].push(num) : "";
    });

    // Log.info("duzias", res.duzias);

    /************/

    // Obtém o tamanho da dúzia
    let countDuz = [];
    for (let i = 0; i <= 2; i++) {
        countDuz[i] = res.duzias[i].length;
    }// for (let i = 0; i <= 2; i++)

    // Log.info("countDuz", countDuz);

    /************/

    let somaDuzias = (countDuz[0] + countDuz[1] + countDuz[2]);

    /************/

    // Obtém o percentual do tamanho da dúzia
    for (let i = 0; i <= 2; i++) {
        res.percDuz[i] = Decimals((countDuz[i] / somaDuzias * 100), 0);
    }// for (let i = 0; i <= 2; i++)

    // Log.info("perDuz", res.percDuz);

    /************/

    // Verifica as 3 dúzias
    for (let i = 0; i <= 2; i++) {

        // Verifica se a dúzia iniciou a rodada
        if (dados.rodadaDuz[i] > 0) {

            // último número sorteado
            if (duz[i].includes(dados.numeros[11])) {
                
                // último número sorteado é da dúzia 1
                dados.rodadaDuz[i] = 0;
                dados.banca       += valorDuz[i] * 3;
                dados.valorDuz[i]  = 0;
                dados.vitDuz++;
    
            } else if (rodadaDuz[i] < 9) {
    
                // incrementa rodada até a 9a entrada
                dados.rodadaDuz[i] += 1;
                dados.valorDuz[i]  += ventr[rodadaDuz[i]];
                dados.banca        -= ventr[rodadaDuz[i]];
                
            } else {
    
                // perdeu
                dados.rodadaDuz[i]  = 0;
                dados.banca        -= valorDuz[i];
                dados.valorDuz[i]   = 0;
                dados.derDuz++;
                
            }// if (duz[i].includes(dados.numeros[11]))
    
        }// if (dados.rodadaDuz[i] > 0)

    }// for (let i = 0; i <= 2; i++)

    /************/

    // Começo do jogo
    if (dados.rodadaDuz[0] == 0 && dados.rodadaDuz[1] == 0 && dados.rodadaDuz[2] == 0) {

        // Começar com a melhor dúzia
        if (res.percDuz[0] < 10) {

            // dúzia 1 possui maior probabilidade
            dados.rodadaDuz[0] += 1;
            dados.valorDuz[0]   = ventr[0];
            dados.banca        -= ventr[0];

        } else if (res.percDuz[1] < 10) {

            // dúzia 2 possui maior probabilidade
            dados.rodadaDuz[1] += 1;
            dados.valorDuz[1]   = ventr[0];
            dados.banca        -= ventr[0];

        } else if (res.percDuz[2] < 10) {

            // dúzia 3 possui maior probabilidade
            dados.rodadaDuz[2] += 1;
            dados.valorDuz[2]   = ventr[0];
            dados.banca        -= ventr[0];

        }// else if (res.percDuz[2] < 10)

    }// if (dados.rodadaDuz[0] == 0 && dados.rodadaDuz[1] == 0 && dados.rodadaDuz[2] == 0)

    /************/

    // Retorna o resultado
    return res;
    
};// duzias
