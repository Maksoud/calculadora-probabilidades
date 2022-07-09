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

    // Log.info("dados.numeros", dados.numeros);

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

    // Verifica se a dúzia iniciou a rodada
    if (dados.rodadaDuz > 0) {
        
        // Verifica as 3 dúzias
        for (let i = 0; i <= 2; i++) {

            // Log.info("dados", dados)

            // último número sorteado é da dúzia apostada
            if (duz[i].includes(dados.numeros[dados.numeros.length-1]) && dados.apostaDuz == i) {

                // console.log("Último número sorteado", dados.numeros[dados.numeros.length-1])
                Log.success("Dúzia sorteada: " + (i+1))
                Log.info("Valor acumulado na dúzia: " + dados.valorDuz)
                Log.info("Valor da entrada anterior: " + ventr[dados.rodadaDuz-1])
                Log.success("Ganhou: " + ((ventr[dados.rodadaDuz-1] * 3) - dados.valorDuz))
                Log.info("Novo saldo da banca " + dados.banca)
                
                // último número sorteado é da dúzia 1
                dados.apostaDuz = null;
                dados.banca    += (ventr[dados.rodadaDuz] * 3) - dados.valorDuz;
                dados.rodadaDuz = -1;
                dados.valorDuz  = 0;
                dados.vitDuz++;
    
            } else if (dados.rodadaDuz >= 9) {

                Log.warning("perdeu! " + dados.valorDuz)
                Log.info("Novo saldo da banca " + dados.banca)
    
                // perdeu
                dados.apostaDuz = null;
                dados.rodadaDuz = -1;
                dados.banca    -= dados.valorDuz;
                dados.valorDuz  = 0;
                dados.derDuz++;
                
            } else if (dados.rodadaDuz < 9 && dados.rodadaDuz > 0) {

                // Log.info("rodada menor que 9 -> " + dados.rodadaDuz);
    
                // O último número está na dúzia
                if (duz[i].includes(dados.numeros[dados.numeros.length-1])) {

                    // A dúzia sorteada é tem a menor participação
                    if (res.percDuz[i] < res.percDuz[i-1] && res.percDuz[i] < res.percDuz[i+1]) {
    
                        Log.info("Mudar jogo para dúzia: " + (i+1))
                        Log.info("Rodada: " + dados.rodadaDuz)
                        Log.warning("Valor da entrada: " + ventr[dados.rodadaDuz])

                        dados.apostaDuz  = i;
                        dados.valorDuz  += ventr[dados.rodadaDuz];
                        dados.banca     -= ventr[dados.rodadaDuz];
                        dados.ventr      = ventr[dados.rodadaDuz];
                        
                        Log.warning("Valor acumulado na dúzia: " + dados.valorDuz)

                    } else {
    
                        Log.info("Continuar na dúzia: " + (dados.apostaDuz+1))
                        Log.info("Rodada: " + dados.rodadaDuz)
                        Log.warning("Valor da entrada: " + ventr[dados.rodadaDuz])
                        
                        dados.valorDuz  += ventr[dados.rodadaDuz];
                        dados.banca     -= ventr[dados.rodadaDuz];
                        dados.ventr      = ventr[dados.rodadaDuz];
                        
                        Log.warning("Valor acumulado na dúzia " + dados.valorDuz)
        
                    }// else if (res.percDuz[i] < res.percDuz[i-1] && res.percDuz[i] < res.percDuz[i+1])
    
                }// if (duz[i].includes(dados.numeros[dados.numeros.length-1]))
                
            }// else if (dados.rodadaDuz < 9 && dados.rodadaDuz > 0)
    
        }// for (let i = 0; i <= 2; i++)

        /************/

        // incrementa rodada até a 9a entrada
        dados.rodadaDuz += 1;
            
    }// if (dados.rodadaDuz > 0)

    /************/

    // Começo do jogo
    if (dados.rodadaDuz == 0) {

        // Log.info("Jogo começou")

        // Começar com a melhor dúzia
        if (res.percDuz[0] < res.percDuz[1] && res.percDuz[0] < res.percDuz[2]) {

            Log.info("Começando na dúzia 1...")

            // dúzia 1 possui maior probabilidade
            dados.apostaDuz  = 0;
            dados.rodadaDuz += 1;
            dados.valorDuz   = ventr[0];
            dados.banca     -= ventr[0];
            dados.ventr      = ventr[0];

            Log.warning("Valor da entrada " + dados.valorDuz)

        } else if (res.percDuz[1] < res.percDuz[0] && res.percDuz[1] < res.percDuz[2]) {

            Log.info("Começando na dúzia 2...")

            // dúzia 2 possui maior probabilidade
            dados.apostaDuz  = 1;
            dados.rodadaDuz += 1;
            dados.valorDuz   = ventr[0];
            dados.banca     -= ventr[0];
            dados.ventr      = ventr[0];

            Log.warning("Valor da entrada " + dados.valorDuz)

        } else if (res.percDuz[2] < res.percDuz[1] && res.percDuz[2] < res.percDuz[0]) {

            Log.info("Começando na dúzia 3...")

            // dúzia 3 possui maior probabilidade
            dados.apostaDuz  = 2;
            dados.rodadaDuz += 1;
            dados.valorDuz   = ventr[0];
            dados.banca     -= ventr[0];
            dados.ventr      = ventr[0];

            Log.warning("Valor da entrada " + dados.valorDuz)

        } else {

            Log.warning("Aguardando novo sorteio para desempate de probabilidade")

        }// else if (res.percDuz[2] < 25)
        
    }// if (dados.rodadaDuz == 0)

    Log.info("Percentual de participação da dúzia 1: " + res.percDuz[0] + "%");
    Log.info("Percentual de participação da dúzia 2: " + res.percDuz[1] + "%");
    Log.info("Percentual de participação da dúzia 3: " + res.percDuz[2] + "%");

    /************/

    // Retorna o resultado
    return res;
    
};// duzias

/************/

exports.colunas = (dados) => {

    let res = {
        colunas: [],
        percCol: [],
    };

    // Log.info("dados.numeros", dados.numeros);

    /************/

    // Separa cada número sorteado em dúzias
    dados.numeros.forEach( num => {
        typeof res.colunas[0] == "undefined" ? res.colunas[0] = [] : "";
        typeof res.colunas[1] == "undefined" ? res.colunas[1] = [] : "";
        typeof res.colunas[2] == "undefined" ? res.colunas[2] = [] : "";
        col[0].includes(num) ? res.colunas[0].push(num) : "";
        col[1].includes(num) ? res.colunas[1].push(num) : "";
        col[2].includes(num) ? res.colunas[2].push(num) : "";
    });

    // Log.info("colunas", res.colunas);

    /************/

    // Obtém o tamanho da dúzia
    let countCol = [];
    for (let i = 0; i <= 2; i++) {
        countCol[i] = res.colunas[i].length;
    }// for (let i = 0; i <= 2; i++)

    // Log.info("countCol", countCol);

    /************/

    let somaColunas = (countCol[0] + countCol[1] + countCol[2]);

    /************/

    // Obtém o percentual do tamanho da dúzia
    for (let i = 0; i <= 2; i++) {
        res.percCol[i] = Decimals((countCol[i] / somaColunas * 100), 0);
    }// for (let i = 0; i <= 2; i++)

    // Log.info("perCol", res.percCol);

    /************/

    // Verifica se a dúzia iniciou a rodada
    if (dados.rodadaCol > 0) {
        
        // Verifica as 3 dúzias
        for (let i = 0; i <= 2; i++) {

            // Log.info("dados", dados)

            // último número sorteado é da dúzia apostada
            if (col[i].includes(dados.numeros[dados.numeros.length-1]) && dados.apostaCol == i) {

                // console.log("Último número sorteado", dados.numeros[dados.numeros.length-1])
                Log.success("Coluna sorteada: " + (i+1))
                Log.info("Valor acumulado na dúzia: " + dados.valorCol)
                Log.info("Valor da entrada anterior: " + ventr[dados.rodadaCol-1])
                Log.success("Ganhou: " + ((ventr[dados.rodadaCol-1] * 3) - dados.valorCol))
                Log.info("Novo saldo da banca " + dados.banca)
                
                // último número sorteado é da dúzia 1
                dados.apostaCol = null;
                dados.banca    += (ventr[dados.rodadaCol] * 3) - dados.valorCol;
                dados.rodadaCol = -1;
                dados.valorCol  = 0;
                dados.vitCol++;
    
            } else if (dados.rodadaCol >= 9) {

                Log.warning("perdeu! " + dados.valorCol)
                Log.info("Novo saldo da banca " + dados.banca)
    
                // perdeu
                dados.apostaCol = null;
                dados.rodadaCol = -1;
                dados.banca    -= dados.valorCol;
                dados.valorCol  = 0;
                dados.derCol++;
                
            } else if (dados.rodadaCol < 9 && dados.rodadaCol > 0) {

                // Log.info("rodada menor que 9 -> " + dados.rodadaCol);
    
                // O último número está na dúzia
                if (col[i].includes(dados.numeros[dados.numeros.length-1])) {

                    // A dúzia sorteada é tem a menor participação
                    if (res.percCol[i] < res.percCol[i-1] && res.percCol[i] < res.percCol[i+1]) {
    
                        Log.info("Mudar jogo para dúzia: " + (i+1))
                        Log.info("Rodada: " + dados.rodadaCol)
                        Log.warning("Valor da entrada: " + ventr[dados.rodadaCol])

                        dados.apostaCol  = i;
                        dados.valorCol  += ventr[dados.rodadaCol];
                        dados.banca     -= ventr[dados.rodadaCol];
                        dados.ventr      = ventr[dados.rodadaCol];
                        
                        Log.warning("Valor acumulado na dúzia: " + dados.valorCol)

                    } else {
    
                        Log.info("Continuar na dúzia: " + (dados.apostaCol+1))
                        Log.info("Rodada: " + dados.rodadaCol)
                        Log.warning("Valor da entrada: " + ventr[dados.rodadaCol])
                        
                        dados.valorCol  += ventr[dados.rodadaCol];
                        dados.banca     -= ventr[dados.rodadaCol];
                        dados.ventr      = ventr[dados.rodadaCol];
                        
                        Log.warning("Valor acumulado na dúzia " + dados.valorCol)
        
                    }// else if (res.percCol[i] < res.percCol[i-1] && res.percCol[i] < res.percCol[i+1])
    
                }// if (col[i].includes(dados.numeros[dados.numeros.length-1]))
                
            }// else if (dados.rodadaCol < 9 && dados.rodadaCol > 0)
    
        }// for (let i = 0; i <= 2; i++)

        /************/

        // incrementa rodada até a 9a entrada
        dados.rodadaCol += 1;
            
    }// if (dados.rodadaCol > 0)

    /************/

    // Começo do jogo
    if (dados.rodadaCol == 0) {

        // Log.info("Jogo começou")

        // Começar com a melhor dúzia
        if (res.percCol[0] < res.percCol[1] && res.percCol[0] < res.percCol[2]) {

            Log.info("Começando na dúzia 1...")

            // dúzia 1 possui maior probabilidade
            dados.apostaCol  = 0;
            dados.rodadaCol += 1;
            dados.valorCol   = ventr[0];
            dados.banca     -= ventr[0];
            dados.ventr      = ventr[0];

            Log.warning("Valor da entrada " + dados.valorCol)

        } else if (res.percCol[1] < res.percCol[0] && res.percCol[1] < res.percCol[2]) {

            Log.info("Começando na dúzia 2...")

            // dúzia 2 possui maior probabilidade
            dados.apostaCol  = 1;
            dados.rodadaCol += 1;
            dados.valorCol   = ventr[0];
            dados.banca     -= ventr[0];
            dados.ventr      = ventr[0];

            Log.warning("Valor da entrada " + dados.valorCol)

        } else if (res.percCol[2] < res.percCol[1] && res.percCol[2] < res.percCol[0]) {

            Log.info("Começando na dúzia 3...")

            // dúzia 3 possui maior probabilidade
            dados.apostaCol  = 2;
            dados.rodadaCol += 1;
            dados.valorCol   = ventr[0];
            dados.banca     -= ventr[0];
            dados.ventr      = ventr[0];

            Log.warning("Valor da entrada " + dados.valorCol)

        } else {

            Log.warning("Aguardando novo sorteio para desempate de probabilidade")

        }// else if (res.percCol[2] < 25)
        
    }// if (dados.rodadaCol == 0)

    Log.info("Percentual de participação da dúzia 1: " + res.percCol[0] + "%");
    Log.info("Percentual de participação da dúzia 2: " + res.percCol[1] + "%");
    Log.info("Percentual de participação da dúzia 3: " + res.percCol[2] + "%");

    /************/

    // Retorna o resultado
    return res;
    
};// colunas
