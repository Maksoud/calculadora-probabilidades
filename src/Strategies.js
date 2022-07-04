const Log      = require("./Logs");
const Decimals = require("./Decimals");

/************/

const duz1  = [1,2,3,4,5,6,7,8,9,10,11,12];
const duz2  = [13,14,15,16,17,18,19,20,21,22,23,24];
const duz3  = [25,26,27,28,29,30,31,32,33,34,35,36];
const lin1  = [1,4,7,10,13,16,19,22,25,28,31,34];
const lin2  = [2,5,8,11,14,17,20,23,26,29,32,35];
const lin3  = [3,6,9,12,15,18,21,24,27,30,33,36];
const met1  = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
const met2  = [19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36];
const pares = [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36];
const impar = [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35];
const verme = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
const preto = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];
const ventr = [1,2.5,5,10,10,15,22,33,50,75,113,170];

/************/

exports.duzias = (dados) => {

    let res = {
        duz1:      [],
        duz2:      [],
        duz3:      [],
        percDuz:   [],
        numeros:   dados.numeros.map(Number),
        valorDez:  dados.valorDez.map(Number),
        rodadaDez: dados.rodadaDez.map(Number),
        banca:     Number(dados.banca),
        vitorias:  Number(dados.vitorias),
        derrotas:  Number(dados.derrotas),
    };

    // console.log("res.numeros", res.numeros);

    /************/
    // Elimina números antigos
    while (res.numeros.length > 12) {
        res.numeros.shift();
    }// while (res.numeros.length > 12)

    /************/
    // Verifica a dúzia
    res.numeros.forEach( num => {
        num = Number(num);
        duz1.includes(num) ? res.duz1.push(num) : "";
        duz2.includes(num) ? res.duz2.push(num) : "";
        duz3.includes(num) ? res.duz3.push(num) : "";
    });

    /************/
    // Analisa tamanho da dúzia
    let countDuz1  = res.duz1.length;
    let countDuz2  = res.duz2.length;
    let countDuz3  = res.duz3.length;
    let somaDuzias = (countDuz1 + countDuz2 + countDuz3);

    /************/
    // Percentual do tamanho da dúzia
    res.percDuz[0] = Decimals((countDuz1 / somaDuzias * 100), 0);
    res.percDuz[1] = Decimals((countDuz2 / somaDuzias * 100), 0);
    res.percDuz[2] = Decimals((countDuz3 / somaDuzias * 100), 0);

    /************/

    // Verifica as 3 dúzias
    for (let i = 0; i <= 2; i++) {
        
        if (res.rodadaDez[i] > 0) {

            // último número sorteado
            if (duz1.includes(res.numeros[11])) {
                
                // último número sorteado é da dúzia 1
                res.rodadaDez[i] = 0;
                res.banca       += valorDez[i] * 3;
                res.valorDez[i]  = 0;
                res.vitorias++;
    
            } else if (rodadaDez[i] < 9) {
    
                // incrementa rodada até a 9a entrada
                res.rodadaDez[i] += 1;
                res.valorDez[i]  += ventr[rodadaDez[i]];
                res.banca        -= ventr[rodadaDez[i]];
                
            } else {
    
                // perdeu
                res.rodadaDez[i]  = 0;
                res.banca        -= valorDez[i];
                res.valorDez[i]   = 0;
                res.derrotas++;
                
            }// if (duz1.includes(res.numeros[11]))
    
        }// if (res.rodadaDez[i] > 0)

    }// for (let i = 0; i <= 2; i++)

    /************/

    // Começo do jogo
    if (res.rodadaDez[0] == 0 && res.rodadaDez[1] == 0 && res.rodadaDez[2] == 0) {

        // Começar com a melhor dúzia
        if (res.percDuz[0] < 10) {

            // dúzia 1 possui maior probabilidade
            res.rodadaDez[0] += 1;
            res.valorDez[0]   = ventr[0];
            res.banca        -= ventr[0];

        } else if (res.percDuz[1] < 10) {

            // dúzia 2 possui maior probabilidade
            res.rodadaDez[1] += 1;
            res.valorDez[1]   = ventr[0];
            res.banca        -= ventr[0];

        } else if (res.percDuz[2] < 10) {

            // dúzia 3 possui maior probabilidade
            res.rodadaDez[2] += 1;
            res.valorDez[2]   = ventr[0];
            res.banca        -= ventr[0];

        }// else if (res.percDuz[2] < 10)

    }// if (res.rodadaDez[0] == 0 && res.rodadaDez[1] == 0 && res.rodadaDez[2] == 0)

    /************/

    // Retorna o resultado
    return res;
    
};// duzias
