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
const ventr = [1,5,20,75,80,110,150,230,340];
const vent2 = [1,3,9,27,81,243];
const maxRd = 9;
const logRd = [];

/************/

exports.duzias = (dados) => {

    let res = {
        duzias:  [],
        percDuz: [],
    };

    // Log.info("dados.numeros", dados.numeros);
    Log.info("Último número sorteado: " + dados.numeros[dados.numeros.length-1]) 

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

        // Ignora os zeros
        if (dados.numeros[dados.numeros.length-1] == 0) {

            Log.warning("Não contabilize o 0...")

            dados.apostaDuz  = null;
            dados.ventr      = 0;
            dados.rodadaDuz -= 1;

        } else {

            // Verifica as 3 dúzias
            for (let i = 0; i <= 2; i++) {

                // Log.info("dados", dados)

                // último número sorteado é da dúzia apostada
                if (duz[i].includes(dados.numeros[dados.numeros.length-1]) && dados.apostaDuz == i) {

                    let tempLog = []
                    tempLog[Date.now()] = {
                        banca:      dados.banca,
                        totalNum:   dados.numeros.length,
                        ultNum:     dados.numeros[dados.numeros.length-1],
                        rodadaDuz:  dados.rodadaDuz,
                        valorDuz:   dados.valorDuz,
                        apostaDuz:  dados.apostaDuz,
                        percDuz:    res.percDuz,
                        acao:       "vitoria"
                    }
                    logRd.push(tempLog)

                    Log.success("Dúzia sorteada: " + (i+1))
                    Log.info("Valor acumulado na dúzia: " + dados.valorDuz)
                    Log.info("Valor da entrada anterior: " + ventr[dados.rodadaDuz-1])
                    Log.success("Ganhou: " + ((ventr[dados.rodadaDuz-1] * 3) - dados.valorDuz))
                    
                    // último número sorteado é da dúzia 1
                    dados.apostaDuz = null;
                    dados.banca    += (ventr[dados.rodadaDuz-1] * 3); // Acrescenta o lucro
                    dados.rodadaDuz = -1;
                    dados.valorDuz  = 0;
                    dados.vitDuz++;

                    Log.info("Novo saldo da banca " + dados.banca)
        
                } else if (dados.rodadaDuz >= maxRd) {

                    let tempLog = []
                    tempLog[Date.now()] = {
                        banca:      dados.banca,
                        totalNum:   dados.numeros.length,
                        ultNum:     dados.numeros[dados.numeros.length-1],
                        rodadaDuz:  dados.rodadaDuz,
                        valorDuz:   dados.valorDuz,
                        apostaDuz:  dados.apostaDuz,
                        percDuz:    res.percDuz,
                        acao:       "derrota"
                    }
                    logRd.push(tempLog)

                    Log.warning("perdeu! " + dados.valorDuz)
                    Log.info("Novo saldo da banca " + dados.banca)
        
                    // perdeu
                    dados.apostaDuz = null;
                    dados.rodadaDuz = -1;
                    // dados.banca    -= dados.valorDuz;
                    dados.valorDuz  = 0;
                    dados.derDuz++;
                    
                } else if (dados.rodadaDuz < maxRd && dados.rodadaDuz > 0) {

                    // Log.info("rodada menor que o máximo -> " + dados.rodadaDuz);
        
                    // O último número está na dúzia
                    if (duz[i].includes(dados.numeros[dados.numeros.length-1])) {

                        // A dúzia sorteada tem a menor participação
                        if (res.percDuz[i] < res.percDuz[i-1] && res.percDuz[i] < res.percDuz[i+1]) {

                            let tempLog = []
                            tempLog[Date.now()] = {
                                banca:      dados.banca,
                                totalNum:   dados.numeros.length,
                                ultNum:     dados.numeros[dados.numeros.length-1],
                                rodadaDuz:  dados.rodadaDuz,
                                valorDuz:   dados.valorDuz,
                                apostaDuz:  dados.apostaDuz,
                                percDuz:    res.percDuz,
                                acao:       "mudança de dúzia"
                            }
                            logRd.push(tempLog)
        
                            Log.info("Mudar jogo para dúzia: " + (i+1))
                            Log.warning("Valor da entrada: " + ventr[dados.rodadaDuz])

                            dados.apostaDuz  = i;
                            dados.valorDuz  += ventr[dados.rodadaDuz];
                            dados.banca     -= ventr[dados.rodadaDuz];
                            dados.ventr      = ventr[dados.rodadaDuz];
                            
                            Log.warning("Valor acumulado na dúzia: " + dados.valorDuz)

                        } else if (res.percDuz[i] == res.percDuz[i-1] || res.percDuz[i] == res.percDuz[i+1]) {

                            let tempLog = []
                            tempLog[Date.now()] = {
                                banca:      dados.banca,
                                totalNum:   dados.numeros.length,
                                ultNum:     dados.numeros[dados.numeros.length-1],
                                rodadaDuz:  dados.rodadaDuz,
                                valorDuz:   dados.valorDuz,
                                apostaDuz:  dados.apostaDuz,
                                percDuz:    res.percDuz,
                                acao:       "empate dúzias"
                            }
                            logRd.push(tempLog)

                            Log.warning("Aguarde o próximo sorteio...")

                            dados.apostaDuz  = null;
                            dados.ventr      = 0;
                            dados.rodadaDuz -= 1;
                        
                        } else {
        
                            Log.info("Continuar na dúzia: " + (dados.apostaDuz+1))
                            Log.warning("Valor da entrada: " + ventr[dados.rodadaDuz])
                            
                            dados.valorDuz  += ventr[dados.rodadaDuz];
                            dados.banca     -= ventr[dados.rodadaDuz];
                            dados.ventr      = ventr[dados.rodadaDuz];
                            
                            Log.warning("Valor acumulado na dúzia " + dados.valorDuz)
            
                        }// else if (res.percDuz[i] < res.percDuz[i-1] && res.percDuz[i] < res.percDuz[i+1])
        
                    }// if (duz[i].includes(dados.numeros[dados.numeros.length-1]))
                    
                }// else if (dados.rodadaDuz < maxRd && dados.rodadaDuz > 0)
        
            }// for (let i = 0; i <= 2; i++)

        }// else if (dados.numeros[dados.numeros.length-1] == 0)

        /************/

        Log.warning("Rodada: " + (dados.rodadaDuz+1))

        // incrementa rodada até a 'maxRd' entrada
        dados.rodadaDuz += 1;
            
    }// if (dados.rodadaDuz > 0)

    /************/

    // Começo do jogo
    if (dados.rodadaDuz == 0) {

        // Log.info("Jogo começou")

        // Começar com a melhor dúzia
        if (res.percDuz[0] < res.percDuz[1] && res.percDuz[0] < res.percDuz[2]) {

            Log.warning("Começando na dúzia 1...")
            Log.warning("Rodada: " + (dados.rodadaDuz+1))

            // dúzia 1 possui maior probabilidade
            dados.apostaDuz  = 0;
            dados.rodadaDuz += 1;
            dados.valorDuz   = ventr[0];
            dados.banca     -= ventr[0];
            dados.ventr      = ventr[0];

            Log.info("Valor da entrada R$" + dados.valorDuz)

        } else if (res.percDuz[1] < res.percDuz[0] && res.percDuz[1] < res.percDuz[2]) {

            Log.warning("Começando na dúzia 2...")
            Log.warning("Rodada: " + (dados.rodadaDuz+1))

            // dúzia 2 possui maior probabilidade
            dados.apostaDuz  = 1;
            dados.rodadaDuz += 1;
            dados.valorDuz   = ventr[0];
            dados.banca     -= ventr[0];
            dados.ventr      = ventr[0];

            Log.info("Valor da entrada R$" + dados.valorDuz)

        } else if (res.percDuz[2] < res.percDuz[1] && res.percDuz[2] < res.percDuz[0]) {

            Log.warning("Começando na dúzia 3...")
            Log.warning("Rodada: " + (dados.rodadaDuz+1))

            // dúzia 3 possui maior probabilidade
            dados.apostaDuz  = 2;
            dados.rodadaDuz += 1;
            dados.valorDuz   = ventr[0];
            dados.banca     -= ventr[0];
            dados.ventr      = ventr[0];

            Log.info("Valor da entrada R$" + dados.valorDuz)

        } else {

            let tempLog = []
            tempLog[Date.now()] = {
                banca:      dados.banca,
                totalNum:   dados.numeros.length,
                ultNum:     dados.numeros[dados.numeros.length-1],
                rodadaDuz:  dados.rodadaDuz,
                valorDuz:   dados.valorDuz,
                apostaDuz:  dados.apostaDuz,
                percDuz:    res.percDuz,
                acao:       "novo jogo empate de dúzias"
            }
            logRd.push(tempLog)

            Log.warning("Aguarde novo sorteio")

            dados.apostaDuz  = null;
            dados.ventr      = 0;

        }// else if (res.percDuz[2] < 25)
        
    }// if (dados.rodadaDuz == 0)

    /************/

    // Log.info("Percentual de participação da dúzia 1: " + res.percDuz[0] + "%");
    // Log.info("Percentual de participação da dúzia 2: " + res.percDuz[1] + "%");
    // Log.info("Percentual de participação da dúzia 3: " + res.percDuz[2] + "%");

    // Exibe o último histórico de operação
    logRd.length > 0 ? Log.warning("Histórico", logRd[logRd.length-1]) : ""

    /************/

    // Retorna o resultado
    return res;
    
};// duzias

/************/

exports.duasDuzias = (dados) => {

    let res = {
        duzias:  [],
        percDuz: [],
    };

    // Log.info("dados.numeros", dados.numeros);
    Log.info("Último número sorteado: " + dados.numeros[dados.numeros.length-1]) 

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

        // Ignora os zeros
        if (dados.numeros[dados.numeros.length-1] == 0) {

            Log.warning("Não contabilize o 0...")

            dados.apostaDuz  = [];
            dados.ventr      = 0;
            dados.rodadaDuz -= 1;

        } else {

            // Verifica as 3 dúzias
            for (let i = 0; i <= 2; i++) {

                // Log.info("dados", dados)

                // último número sorteado é da dúzia apostada
                if (duz[i].includes(dados.numeros[dados.numeros.length-1]) && dados.apostaDuz == i) {

                    let tempLog = []
                    tempLog[Date.now()] = {
                        banca:      dados.banca,
                        totalNum:   dados.numeros.length,
                        ultNum:     dados.numeros[dados.numeros.length-1],
                        rodadaDuz:  dados.rodadaDuz,
                        valorDuz:   dados.valorDuz,
                        apostaDuz:  dados.apostaDuz,
                        percDuz:    res.percDuz,
                        acao:       "vitoria"
                    }
                    logRd.push(tempLog)

                    // Log.success("Dúzia sorteada: " + (i+1))
                    // Log.info("Valor acumulado na dúzia: " + dados.valorDuz)
                    // Log.info("Valor da entrada anterior: " + vent2[dados.rodadaDuz-1])
                    // Log.success("Ganhou: " + ((vent2[dados.rodadaDuz-1] * 3) - dados.valorDuz))
                    
                    // último número sorteado é da dúzia 1
                    dados.apostaDuz = [];
                    dados.banca    += (vent2[dados.rodadaDuz-1] * 3); // Acrescenta o lucro
                    dados.rodadaDuz = -1;
                    dados.valorDuz  = 0;
                    dados.vitDuz++;

                    Log.info("Novo saldo da banca " + dados.banca)
        
                } else if (dados.rodadaDuz >= maxRd) {

                    let tempLog = []
                    tempLog[Date.now()] = {
                        banca:      dados.banca,
                        totalNum:   dados.numeros.length,
                        ultNum:     dados.numeros[dados.numeros.length-1],
                        rodadaDuz:  dados.rodadaDuz,
                        valorDuz:   dados.valorDuz,
                        apostaDuz:  dados.apostaDuz,
                        percDuz:    res.percDuz,
                        acao:       "derrota"
                    }
                    logRd.push(tempLog)

                    // Log.warning("perdeu! " + dados.valorDuz)
                    // Log.info("Novo saldo da banca " + dados.banca)
        
                    // perdeu
                    dados.apostaDuz = [];
                    dados.rodadaDuz = -1;
                    // dados.banca    -= dados.valorDuz;
                    dados.valorDuz  = 0;
                    dados.derDuz++;
                    
                } else if (dados.rodadaDuz < maxRd && dados.rodadaDuz > 0) {

                    // Log.info("rodada menor que o máximo -> " + dados.rodadaDuz);
        
                    // O último número está na dúzia
                    if (duz[i].includes(dados.numeros[dados.numeros.length-1])) {

                        // A dúzia sorteada tem a menor participação
                        if (res.percDuz[i] < res.percDuz[i-1] && res.percDuz[i] < res.percDuz[i+1]) {

                            let tempLog = []
                            tempLog[Date.now()] = {
                                banca:      dados.banca,
                                totalNum:   dados.numeros.length,
                                ultNum:     dados.numeros[dados.numeros.length-1],
                                rodadaDuz:  dados.rodadaDuz,
                                valorDuz:   dados.valorDuz,
                                apostaDuz:  dados.apostaDuz,
                                percDuz:    res.percDuz,
                                acao:       "mudança de dúzia"
                            }
                            logRd.push(tempLog)
        
                            // Log.info("Mudar jogo para dúzia: " + (i+1))
                            // Log.warning("Valor da entrada: " + vent2[dados.rodadaDuz])

                            dados.apostaDuz  = i;
                            dados.valorDuz  += vent2[dados.rodadaDuz];
                            dados.banca     -= vent2[dados.rodadaDuz];
                            dados.ventr      = vent2[dados.rodadaDuz];
                            
                            Log.warning("Valor acumulado na dúzia: " + dados.valorDuz)

                        } else if (res.percDuz[i] == res.percDuz[i-1] || res.percDuz[i] == res.percDuz[i+1]) {

                            let tempLog = []
                            tempLog[Date.now()] = {
                                banca:      dados.banca,
                                totalNum:   dados.numeros.length,
                                ultNum:     dados.numeros[dados.numeros.length-1],
                                rodadaDuz:  dados.rodadaDuz,
                                valorDuz:   dados.valorDuz,
                                apostaDuz:  dados.apostaDuz,
                                percDuz:    res.percDuz,
                                acao:       "empate dúzias"
                            }
                            logRd.push(tempLog)

                            // Log.warning("Aguarde o próximo sorteio...")

                            dados.apostaDuz  = [];
                            dados.ventr      = 0;
                            dados.rodadaDuz -= 1;
                        
                        } else {
        
                            Log.info("Continuar na dúzia: " + (dados.apostaDuz+1))
                            Log.warning("Valor da entrada: " + vent2[dados.rodadaDuz])
                            
                            dados.valorDuz  += vent2[dados.rodadaDuz];
                            dados.banca     -= vent2[dados.rodadaDuz];
                            dados.ventr      = vent2[dados.rodadaDuz];
                            
                            Log.warning("Valor acumulado na dúzia " + dados.valorDuz)
            
                        }// else if (res.percDuz[i] < res.percDuz[i-1] && res.percDuz[i] < res.percDuz[i+1])
        
                    }// if (duz[i].includes(dados.numeros[dados.numeros.length-1]))
                    
                }// else if (dados.rodadaDuz < maxRd && dados.rodadaDuz > 0)
        
            }// for (let i = 0; i <= 2; i++)

        }// else if (dados.numeros[dados.numeros.length-1] == 0)

        /************/

        // Log.warning("Rodada: " + (dados.rodadaDuz+1))

        // incrementa rodada até a 'maxRd' entrada
        dados.rodadaDuz += 1;
            
    }// if (dados.rodadaDuz > 0)

    /************/

    // Começo do jogo
    if (dados.rodadaDuz == 0) {

        // Log.info("Jogo começou")

        for (let i = 0; i <= 1; i++) {

            if (i == 0) {

                if (res.percDuz[0] < res.percDuz[1] && res.percDuz[0] < res.percDuz[2]) {

                    Log.warning("Começando na dúzia 1...")
                    // Log.warning("Rodada: " + (dados.rodadaDuz+1))

                    // dúzia 1 possui maior probabilidade
                    dados.apostaDuz[i] = 0;
                    // dados.rodadaDuz += 1;
                    dados.valorDuz   = vent2[0];
                    dados.banca     -= vent2[0];
                    dados.ventr      = vent2[0];

                    // Log.info("Valor da entrada R$" + dados.valorDuz)

                } else if (res.percDuz[1] < res.percDuz[0] && res.percDuz[1] < res.percDuz[2]) {

                    Log.warning("Começando na dúzia 2...")
                    // Log.warning("Rodada: " + (dados.rodadaDuz+1))

                    // dúzia 2 possui maior probabilidade
                    dados.apostaDuz[i] = 1;
                    // dados.rodadaDuz += 1;
                    dados.valorDuz   = vent2[0];
                    dados.banca     -= vent2[0];
                    dados.ventr      = vent2[0];

                    // Log.info("Valor da entrada R$" + dados.valorDuz)

                } else if (res.percDuz[2] < res.percDuz[1] && res.percDuz[2] < res.percDuz[0]) {

                    Log.warning("Começando na dúzia 3...")
                    // Log.warning("Rodada: " + (dados.rodadaDuz+1))

                    // dúzia 3 possui maior probabilidade
                    dados.apostaDuz[i] = 2;
                    // dados.rodadaDuz += 1;
                    dados.valorDuz   = vent2[0];
                    dados.banca     -= vent2[0];
                    dados.ventr      = vent2[0];

                    // Log.info("Valor da entrada R$" + dados.valorDuz)

                } else {

                    let tempLog = []
                    tempLog[Date.now()] = {
                        banca:      dados.banca,
                        totalNum:   dados.numeros.length,
                        ultNum:     dados.numeros[dados.numeros.length-1],
                        rodadaDuz:  dados.rodadaDuz,
                        valorDuz:   dados.valorDuz,
                        apostaDuz:  dados.apostaDuz,
                        percDuz:    res.percDuz,
                        acao:       "novo jogo empate de dúzias"
                    }
                    logRd.push(tempLog)

                    // Log.warning("Aguarde novo sorteio")

                    dados.apostaDuz[i] = [];
                    dados.ventr        = 0;

                }// else if (res.percDuz[2] < 25)

            } else if (i == 1) {

                if (dados.apostaDuz.length > 0) { // Quando houver empates não entra na segunda análise

                    if (res.percDuz[0] < dados.apostaDuz[i-1] && dados.apostaDuz[i-1] != 0) {

                        Log.warning("segunda dúzia começa na 1...")
                        // Log.warning("Rodada: " + (dados.rodadaDuz+1))

                        // dúzia 1 possui maior probabilidade
                        dados.apostaDuz[i] = 0;
                        // dados.rodadaDuz += 1;
                        dados.valorDuz   = vent2[0];
                        dados.banca     -= vent2[0];
                        dados.ventr      = vent2[0];

                        // Log.info("Valor da entrada R$" + dados.valorDuz)

                    } else if (res.percDuz[1] < res.percDuz[2] && dados.apostaDuz[i-1] != 1) {

                        Log.warning("segunda dúzia começa na 2...")
                        // Log.warning("Rodada: " + (dados.rodadaDuz+1))

                        // dúzia 1 possui maior probabilidade
                        dados.apostaDuz[i] = 0;
                        // dados.rodadaDuz += 1;
                        dados.valorDuz   = vent2[0];
                        dados.banca     -= vent2[0];
                        dados.ventr      = vent2[0];

                        // Log.info("Valor da entrada R$" + dados.valorDuz)

                    } else if (res.percDuz[2] < dados.apostaDuz[i-1] && dados.apostaDuz[i-1] != 2) {

                        Log.warning("segunda dúzia começa na 3...")
                        // Log.warning("Rodada: " + (dados.rodadaDuz+1))

                        // dúzia 1 possui maior probabilidade
                        dados.apostaDuz[i] = 0;
                        // dados.rodadaDuz += 1;
                        dados.valorDuz   = vent2[0];
                        dados.banca     -= vent2[0];
                        dados.ventr      = vent2[0];

                        // Log.info("Valor da entrada R$" + dados.valorDuz)

                    }// else if (res.percDuz[2] < dados.apostaDuz[i-1] && dados.apostaDuz[i-1] != 2)

                }// if (dados.apostaDuz.length > 0)

            }// else if (i == 1)

        }// for (let i = 0; i <= 1; i++)

        dados.apostaDuz.length == 2 ? dados.rodadaDuz += 1 : ""

    }// if (dados.rodadaDuz == 0)

    /************/

    Log.warning("Dados", dados)

    Log.info("Percentual de participação da dúzia 1: " + res.percDuz[0] + "%");
    Log.info("Percentual de participação da dúzia 2: " + res.percDuz[1] + "%");
    Log.info("Percentual de participação da dúzia 3: " + res.percDuz[2] + "%");

    // Exibe o último histórico de operação
    // logRd.length > 0 ? Log.warning("Histórico", logRd[logRd.length-1]) : ""

    /************/

    // Retorna o resultado
    return res;
    
};// duasDuzias

/************/

exports.colunas = (dados) => {

    // Retorna o resultado
    return null;
    
};// colunas

/************/

exports.metades = (dados) => {

    // Retorna o resultado
    return null;
    
};// metades

/************/

exports.paresImpares = (dados) => {

    // Retorna o resultado
    return null;
    
};// paresImpares

/************/

exports.vermelhoPreto = (dados) => {

    // Retorna o resultado
    return null;
    
};// vermelhoPreto
