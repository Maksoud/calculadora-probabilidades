const Log      = require("./Logs");
const Decimals = require("./Decimals");

/************/

const duz   = []
    duz[0]  = [1,2,3,4,5,6,7,8,9,10,11,12]
    duz[1]  = [13,14,15,16,17,18,19,20,21,22,23,24]
    duz[2]  = [25,26,27,28,29,30,31,32,33,34,35,36]
const col   = []
    col[0]  = [1,4,7,10,13,16,19,22,25,28,31,34]
    col[1]  = [2,5,8,11,14,17,20,23,26,29,32,35]
    col[2]  = [3,6,9,12,15,18,21,24,27,30,33,36]
const met   = []
    met[0]  = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
    met[1]  = [19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]
const pares = [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36]
const impar = [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35]
const verme = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]
const preto = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35]
const ventr = [1,5,20,75,80,110,150,230,340]
const vent2 = [1,3,9,27,81,243]
const maxRd = 9
const logRd = []

/************/

exports.duzias = (dados) => {

    let res = {
        duzias:  [],
        percDuz: [],
    }

    // Log.info("dados.numeros", dados.numeros);
    // Log.info("Último número sorteado: " + dados.numeros[dados.numeros.length-1])

    /************/

    // Separa cada número sorteado em dúzias
    dados.numeros.forEach( num => {
        typeof res.duzias[0] == "undefined" ? res.duzias[0] = [] : ""
        typeof res.duzias[1] == "undefined" ? res.duzias[1] = [] : ""
        typeof res.duzias[2] == "undefined" ? res.duzias[2] = [] : ""
        duz[0].includes(num) ? res.duzias[0].push(num) : ""
        duz[1].includes(num) ? res.duzias[1].push(num) : ""
        duz[2].includes(num) ? res.duzias[2].push(num) : ""
    })

    // Log.info("duzias", res.duzias);

    /************/

    // Obtém o tamanho da dúzia
    let countDuz = [];
    for (let i = 0; i <= 2; i++) {
        countDuz[i] = res.duzias[i].length
    }// for (let i = 0; i <= 2; i++)

    // Log.info("countDuz", countDuz);

    /************/

    let somaDuzias = (countDuz[0] + countDuz[1] + countDuz[2])

    /************/

    // Obtém o percentual do tamanho da dúzia
    for (let i = 0; i <= 2; i++) {
        res.percDuz[i] = Decimals((countDuz[i] / somaDuzias * 100), 0)
    }// for (let i = 0; i <= 2; i++)

    // Log.info("perDuz", res.percDuz);

    /************/

    if (typeof dados.apoDuzTemp != "undefined" && dados.apoDuzTemp != null) {
        // console.log("dados.apoDuzTemp", dados.apoDuzTemp)
        dados.apostaDuz  = dados.apoDuzTemp
        dados.apoDuzTemp = null
    }// (typeof dados.apoDuzTemp != "undefined" && dados.apoDuzTemp != null)

    /************/

    // Verifica se a dúzia iniciou a rodada
    if (dados.rodadaDuz > 0) {

        // Verifica as 3 dúzias
        for (let i = 0; i <= 2; i++) {

            // Log.info("dados", dados)

            // último número sorteado é da dúzia apostada
            if (duz[i].includes(dados.numeros[dados.numeros.length-1]) && dados.apostaDuz == i && dados.ventr > 0) {

                let tempLog = []
                tempLog[Date.now()] = {
                    banca:     dados.banca,
                    totalNum:  dados.numeros.length,
                    ultNum:    dados.numeros[dados.numeros.length-1],
                    rodadaDuz: dados.rodadaDuz,
                    valorDuz:  dados.valorDuz,
                    acumDuz:   dados.acumDuz,
                    apostaDuz: dados.apostaDuz,
                    percDuz:   res.percDuz,
                    acao:      "vitoria"
                }
                logRd.push(tempLog)

                // Log.success("Dúzia sorteada: " + (i+1))
                // Log.info("Valor acumulado na dúzia: " + dados.acumDuz)
                // Log.info("Valor da entrada anterior: " + ventr[dados.rodadaDuz-1])
                // Log.success("Ganhou: " + ((ventr[dados.rodadaDuz-1] * 3) - dados.valorDuz))
                
                // último número sorteado é da dúzia 1
                dados.apostaDuz  = null
                dados.banca     += (ventr[dados.rodadaDuz-1] * 3) // Acrescenta o lucro
                dados.rodadaDuz  = 0
                dados.ventr      = 0
                dados.valorDuz   = 0
                dados.acumDuz    = 0
                dados.vitDuz++

                // Log.info("Novo saldo da banca " + dados.banca)
    
            } else if (dados.rodadaDuz >= maxRd && dados.ventr > 0) {

                let tempLog = []
                tempLog[Date.now()] = {
                    banca:     dados.banca,
                    totalNum:  dados.numeros.length,
                    ultNum:    dados.numeros[dados.numeros.length-1],
                    rodadaDuz: dados.rodadaDuz,
                    valorDuz:  dados.valorDuz,
                    acumDuz:   dados.acumDuz,
                    apostaDuz: dados.apostaDuz,
                    percDuz:   res.percDuz,
                    acao:      "derrota"
                }
                logRd.push(tempLog)

                // Log.warning("perdeu! " + dados.acumDuz)
                // Log.info("Novo saldo da banca " + dados.banca)
    
                // perdeu
                dados.apostaDuz = null
                dados.rodadaDuz = 0
                dados.ventr     = 0
                // dados.banca    -= dados.valorDuz
                dados.valorDuz  = 0
                dados.acumDuz   = 0
                dados.derDuz++
                
            } else if (dados.rodadaDuz < maxRd && dados.rodadaDuz > 0) {

                // Log.info("rodada menor que o máximo -> " + dados.rodadaDuz);
    
                // O último número está na dúzia
                if (duz[i].includes(dados.numeros[dados.numeros.length-1])) {

                    let percSorted = [...res.percDuz]
                    percSorted.sort((a, b) => a - b)
            
                    let duplicated = res.percDuz.some((element, index) => {
                        return res.percDuz.indexOf(element) !== index
                    })

                    /************/

                    if (duplicated) {

                        let tempLog = []
                        tempLog[Date.now()] = {
                            banca:     dados.banca,
                            totalNum:  dados.numeros.length,
                            ultNum:    dados.numeros[dados.numeros.length-1],
                            rodadaDuz: dados.rodadaDuz,
                            valorDuz:  dados.valorDuz,
                            acumDuz:   dados.acumDuz,
                            apostaDuz: dados.apostaDuz,
                            percDuz:   res.percDuz,
                            acao:      "empate dúzias"
                        }
                        logRd.push(tempLog)

                        // Log.warning("Aguarde o próximo sorteio...")

                        dados.apoDuzTemp = dados.apostaDuz
                        dados.apostaDuz  = null
                        dados.ventr      = 0
                        // dados.rodadaDuz -= 1
                    
                    } else {

                        // A dúzia sorteada tem a menor participação
                        // if (dados.apostaDuz != res.percDuz.indexOf(percSorted[0])) {
                        if (res.percDuz[i] < res.percDuz[i-1] && res.percDuz[i] < res.percDuz[i+1]) {

                            let tempLog = []
                            tempLog[Date.now()] = {
                                banca:     dados.banca,
                                totalNum:  dados.numeros.length,
                                ultNum:    dados.numeros[dados.numeros.length-1],
                                rodadaDuz: dados.rodadaDuz,
                                valorDuz:  dados.valorDuz,
                                acumDuz:   dados.acumDuz,
                                apostaDuz: dados.apostaDuz,
                                percDuz:   res.percDuz,
                                acao:      "mudança de dúzia"
                            }
                            logRd.push(tempLog)
        
                            // Log.info("Mudar jogo para dúzia: " + (i+1))
                            // Log.warning("Valor da entrada: " + ventr[dados.rodadaDuz])

                            dados.apostaDuz = i
                            dados.valorDuz += ventr[dados.rodadaDuz]
                            dados.acumDuz  += ventr[dados.rodadaDuz]
                            dados.banca    -= ventr[dados.rodadaDuz]
                            dados.ventr     = ventr[dados.rodadaDuz]
                            
                            // Log.warning("Valor acumulado na dúzia: " + dados.acumDuz)

                        } else {

                            // Log.info("Continuar na dúzia: " + (dados.apostaDuz+1))
                            // Log.warning("Valor da entrada: R$ " + ventr[dados.rodadaDuz])
                            
                            dados.valorDuz += ventr[dados.rodadaDuz]
                            dados.acumDuz  += ventr[dados.rodadaDuz]
                            dados.banca    -= ventr[dados.rodadaDuz]
                            dados.ventr     = ventr[dados.rodadaDuz]
                            
                            // Log.warning("Valor acumulado na dúzia: R$ " + dados.acumDuz)

                        }// else if (res.percDuz[i] < res.percDuz[i-1] && res.percDuz[i] < res.percDuz[i+1])

                    }// else if (duplicated)

                } else if (dados.numeros[dados.numeros.length-1] == 0) {

                    // Ignora os zeros
                    dados.apostaDuz  = null
                    dados.ventr      = 0
                    // dados.rodadaDuz -= 1

                    // Log.warning("Não contabilize o 0...")

                }// else if (dados.numeros[dados.numeros.length-1] == 0)
                
            }// else if (dados.rodadaDuz < maxRd && dados.rodadaDuz > 0)
    
        }// for (let i = 0; i <= 2; i++)

        /************/

        // Log.warning("Rodada: " + (dados.rodadaDuz+1))

        // incrementa rodada até a 'maxRd' entrada
        if (dados.ventr > 0) dados.rodadaDuz += 1
            
    }// if (dados.rodadaDuz > 0)

    /************/

    // Começo do jogo
    if (dados.rodadaDuz == 0) {

        let percSorted = [...res.percDuz]
        percSorted.sort((a, b) => a - b)

        duplicated = res.percDuz.some((element, index) => {
            return res.percDuz.indexOf(element) !== index
        })

        /************/

        // Log.info("Jogo começou")
        if (duplicated == false) {

            if (dados.numeros[dados.numeros.length-1] == 0) {

                // Ignora os zeros
                dados.apostaDuz  = null
                dados.ventr      = 0
                // dados.rodadaDuz -= 1

                Log.warning("Não começa após o 0...")

            } else {

                // Log.warning("Rodada: " + (dados.rodadaDuz+1))
                dados.apostaDuz = res.percDuz.indexOf(percSorted[0])
                
                // Log.warning("Começando na dúzia "+(dados.apostaDuz+1)+"...")

                dados.rodadaDuz += 1
                dados.valorDuz   = ventr[0]
                dados.acumDuz    = ventr[0]
                dados.banca     -= ventr[0]
                dados.ventr      = ventr[0]

                // Log.info("Valor da entrada R$ " + dados.valorDuz)

            }// if (dados.numeros[dados.numeros.length-1] == 0)

        } else {

            let tempLog = []
            tempLog[Date.now()] = {
                banca:     dados.banca,
                totalNum:  dados.numeros.length,
                ultNum:    dados.numeros[dados.numeros.length-1],
                rodadaDuz: dados.rodadaDuz,
                valorDuz:  dados.valorDuz,
                acumDuz:   dados.acumDuz,
                apostaDuz: dados.apostaDuz,
                percDuz:   res.percDuz,
                acao:      "novo jogo empate de dúzias"
            }
            logRd.push(tempLog)

            // Log.warning("Aguarde novo sorteio")

            dados.apostaDuz = null
            dados.ventr     = 0

        }// else if (duplicated == false)
        
    }// if (dados.rodadaDuz == 0)

    /************/

    // Log.info("Percentual de participação da dúzia 1: " + res.percDuz[0] + "%")
    // Log.info("Percentual de participação da dúzia 2: " + res.percDuz[1] + "%")
    // Log.info("Percentual de participação da dúzia 3: " + res.percDuz[2] + "%")

    // Exibe o último histórico de operação
    // logRd.length > 0 ? Log.warning("Histórico", logRd[logRd.length-1]) : ""

    /************/

    // Retorna o resultado
    return res
    
};// duzias

/************/

exports.duasDuzias = (dados) => {

    let res = {
        duzias:  [],
        percDuz: [],
    };

    // Log.info("dados.numeros", dados.numeros);
    // Log.info("Último número sorteado: " + dados.numeros[dados.numeros.length-1])

    /************/

    // Separa cada número sorteado em dúzias
    dados.numeros.forEach( num => {
        typeof res.duzias[0] == "undefined" ? res.duzias[0] = [] : ""
        typeof res.duzias[1] == "undefined" ? res.duzias[1] = [] : ""
        typeof res.duzias[2] == "undefined" ? res.duzias[2] = [] : ""
        duz[0].includes(num) ? res.duzias[0].push(num) : ""
        duz[1].includes(num) ? res.duzias[1].push(num) : ""
        duz[2].includes(num) ? res.duzias[2].push(num) : ""
    })

    // Log.info("duzias", res.duzias);

    /************/

    // Obtém o tamanho da dúzia
    let countDuz = [];
    for (let i = 0; i <= 2; i++) {
        countDuz[i] = res.duzias[i].length
    }// for (let i = 0; i <= 2; i++)

    // Log.info("countDuz", countDuz);

    /************/

    let somaDuzias = (countDuz[0] + countDuz[1] + countDuz[2])

    /************/

    // Obtém o percentual do tamanho da dúzia
    for (let i = 0; i <= 2; i++) {
        res.percDuz[i] = Decimals((countDuz[i] / somaDuzias * 100), 0)
    }// for (let i = 0; i <= 2; i++)

    // Log.info("perDuz", res.percDuz);

    /************/

    if (typeof dados.apoDuzTemp != "undefined" && dados.apoDuzTemp != null) {
        // console.log("dados.apoDuzTemp", dados.apoDuzTemp)
        dados.apostaDuz  = dados.apoDuzTemp
        dados.apoDuzTemp = null
    }// (typeof dados.apoDuzTemp != "undefined" && dados.apoDuzTemp != null)

    /************/

    // Verifica se a dúzia iniciou a rodada
    if (dados.rodadaDuz > 0) {

        // Verifica as 3 dúzias
        for (let i = 0; i <= 2; i++) {

            // Log.info("dados", dados)

            // último número sorteado é da dúzia apostada
            if (duz[i].includes(dados.numeros[dados.numeros.length-1]) && (dados.apostaDuz[0] == i || dados.apostaDuz[1] == i)) {

                let tempLog = []
                tempLog[Date.now()] = {
                    banca:     dados.banca,
                    totalNum:  dados.numeros.length,
                    ultNum:    dados.numeros[dados.numeros.length-1],
                    rodadaDuz: dados.rodadaDuz,
                    valorDuz:  dados.valorDuz,
                    acumDuz:   dados.acumDuz,
                    apostaDuz: dados.apostaDuz,
                    percDuz:   res.percDuz,
                    acao:      "vitoria"
                }
                logRd.push(tempLog)

                // Log.success("Dúzia sorteada: " + (i+1))
                // Log.info("Valor acumulado na dúzia: R$ " + dados.acumDuz)
                // Log.info("Valor da entrada anterior: R$ " + vent2[dados.rodadaDuz-1])
                // Log.success("Ganhou: R$ " + ((vent2[dados.rodadaDuz-1] * 3) - dados.acumDuz))
                // Log.info("Saldo anterior da banca: R$ " + dados.banca)
                // Log.info("Valor a ser adicionado à banca: R$ " + (vent2[dados.rodadaDuz-1] * 2))
                
                // último número sorteado é da dúzia 1
                dados.apostaDuz  = []
                dados.banca     += (vent2[dados.rodadaDuz-1] * 3) // Acrescenta o lucro
                dados.rodadaDuz  = 0
                dados.ventr      = 0
                dados.valorDuz   = 0
                dados.acumDuz    = 0
                dados.vitDuz++
                
                // Log.info("Novo saldo da banca " + dados.banca)
    
            } else if (dados.rodadaDuz >= maxRd) {

                let tempLog = []
                tempLog[Date.now()] = {
                    banca:     dados.banca,
                    totalNum:  dados.numeros.length,
                    ultNum:    dados.numeros[dados.numeros.length-1],
                    rodadaDuz: dados.rodadaDuz,
                    valorDuz:  dados.valorDuz,
                    acumDuz:   dados.acumDuz,
                    apostaDuz: dados.apostaDuz,
                    percDuz:   res.percDuz,
                    acao:      "derrota"
                }
                logRd.push(tempLog)

                // Log.warning("perdeu! " + dados.valorDuz)
                // Log.info("Novo saldo da banca " + dados.banca)
    
                // perdeu
                dados.apostaDuz = []
                dados.rodadaDuz = 0
                dados.ventr     = 0
                // dados.banca    -= dados.valorDuz
                dados.valorDuz  = 0
                dados.acumDuz   = 0
                dados.derDuz++
                
            } else if (dados.rodadaDuz < maxRd && dados.rodadaDuz > 0) {

                // Log.info("rodada menor que o máximo -> " + dados.rodadaDuz);
    
                // O último número está na dúzia
                if (duz[i].includes(dados.numeros[dados.numeros.length-1])) {

                    let percSorted = [...res.percDuz]
                    percSorted.sort((a, b) => a - b)
            
                    let duplicated = res.percDuz.some((element, index) => {
                        return res.percDuz.indexOf(element) !== index
                    })

                    /************/

                    if (duplicated) {

                        let tempLog = []
                        tempLog[Date.now()] = {
                            banca:     dados.banca,
                            totalNum:  dados.numeros.length,
                            ultNum:    dados.numeros[dados.numeros.length-1],
                            rodadaDuz: dados.rodadaDuz,
                            valorDuz:  dados.valorDuz,
                            acumDuz:   dados.acumDuz,
                            apostaDuz: dados.apostaDuz,
                            percDuz:   res.percDuz,
                            acao:      "empate dúzias"
                        }
                        logRd.push(tempLog)

                        // Log.warning("Aguarde o próximo sorteio...")

                        dados.apoDuzTemp = dados.apostaDuz
                        dados.apostaDuz  = []
                        dados.ventr      = 0
                        // dados.rodadaDuz -= 1
                    
                    } else {

                        // A dúzia sorteada tem a menor participação
                        // if (dados.apostaDuz[0] != res.percDuz.indexOf(percSorted[0]) && dados.apostaDuz[1] != res.percDuz.indexOf(percSorted[1])) {
                        if (res.percDuz[i] < res.percDuz[i-1] && res.percDuz[i] < res.percDuz[i+1]) {

                            let tempLog = []
                            tempLog[Date.now()] = {
                                banca:     dados.banca,
                                totalNum:  dados.numeros.length,
                                ultNum:    dados.numeros[dados.numeros.length-1],
                                rodadaDuz: dados.rodadaDuz,
                                valorDuz:  dados.valorDuz,
                                acumDuz:   dados.acumDuz,
                                apostaDuz: dados.apostaDuz,
                                percDuz:   res.percDuz,
                                acao:      "mudança de dúzia"
                            }
                            logRd.push(tempLog)
        
                            // Log.info("Mudar jogo para dúzia: " + (dados.apostaDuz[0]+1)+" e "+(dados.apostaDuz[1]+1))
                            // Log.warning("Valor da entrada: " + vent2[dados.rodadaDuz])

                            dados.apostaDuz[0] = res.percDuz.indexOf(percSorted[0])
                            dados.apostaDuz[1] = res.percDuz.indexOf(percSorted[1])
                            dados.valorDuz    += vent2[dados.rodadaDuz]
                            dados.acumDuz     += vent2[dados.rodadaDuz]*2
                            dados.banca       -= vent2[dados.rodadaDuz]*2
                            dados.ventr        = vent2[dados.rodadaDuz]
                            
                            // Log.warning("Valor acumulado na dúzia: " + dados.acumDuz)

                        } else {
    
                            // Log.info("Continuar na dúzia: " + (dados.apostaDuz[0]+1)+" e "+(dados.apostaDuz[1]+1))
                            // Log.warning("Valor da entrada: " + vent2[dados.rodadaDuz])
                            
                            dados.valorDuz += vent2[dados.rodadaDuz]
                            dados.acumDuz  += vent2[dados.rodadaDuz]*2
                            dados.banca    -= vent2[dados.rodadaDuz]*2
                            dados.ventr     = vent2[dados.rodadaDuz]

                        }// else if (res.percDuz[i] < res.percDuz[i-1] && res.percDuz[i] < res.percDuz[i+1])
                        
                        // Log.warning("Valor acumulado na dúzia: R$ " + dados.acumDuz)
        
                    }// else if (duplicated)
    
                } else if (dados.numeros[dados.numeros.length-1] == 0) {
        
                    // Ignora os zeros
                    dados.apostaDuz  = [];
                    dados.ventr      = 0;
                    // dados.rodadaDuz -= 1

                    // Log.warning("Não contabilize o 0...")
        
                }// if (duz[i].includes(dados.numeros[dados.numeros.length-1]))
                
            }// else if (dados.rodadaDuz < maxRd && dados.rodadaDuz > 0)
    
        }// for (let i = 0; i <= 2; i++)

        /************/

        // Log.warning("Rodada: " + (dados.rodadaDuz+1))

        // incrementa rodada até a 'maxRd' entrada
        if (dados.ventr > 0) dados.rodadaDuz += 1
            
    }// if (dados.rodadaDuz > 0)

    /************/

    // Começo do jogo
    if (dados.rodadaDuz == 0) {

        let percSorted = [...res.percDuz]
        percSorted.sort((a, b) => a - b)

        duplicated = res.percDuz.some((element, index) => {
            return res.percDuz.indexOf(element) !== index
        })

        /************/

        // Log.info("Jogo começou")
        if (duplicated == false) {

            if (dados.numeros[dados.numeros.length-1] == 0) {

                // Ignora os zeros
                dados.apostaDuz  = null
                dados.ventr      = 0
                // dados.rodadaDuz -= 1

                Log.warning("Não começa após o 0...")

            } else {

                // Log.warning("Rodada: " + (dados.rodadaDuz+1))
                dados.apostaDuz[0] = res.percDuz.indexOf(percSorted[0])
                dados.apostaDuz[1] = res.percDuz.indexOf(percSorted[1])
                
                // Log.warning("Começando na dúzia "+(dados.apostaDuz[0]+1)+" e "+(dados.apostaDuz[1]+1)+"...")

                dados.rodadaDuz += 1
                dados.valorDuz   = vent2[0]
                dados.acumDuz    = vent2[0]*2
                dados.banca     -= vent2[0]*2
                dados.ventr      = vent2[0]

                // Log.info("Valor da entrada R$ " + dados.valorDuz)

            }// if (dados.numeros[dados.numeros.length-1] == 0)

        } else {

            let tempLog = []
            tempLog[Date.now()] = {
                banca:      dados.banca,
                totalNum:   dados.numeros.length,
                ultNum:     dados.numeros[dados.numeros.length-1],
                rodadaDuz:  dados.rodadaDuz,
                valorDuz:   dados.valorDuz,
                acumDuz:    dados.acumDuz,
                apostaDuz:  dados.apostaDuz,
                percDuz:    res.percDuz,
                acao:       "novo jogo empate de dúzias"
            }
            logRd.push(tempLog)

            // Log.warning("Aguarde novo sorteio")

            dados.apostaDuz = []
            dados.ventr     = 0

        }// else if (duplicated == false)

        // dados.apostaDuz.length == 2 ? dados.rodadaDuz += 1 : ""

    }// if (dados.rodadaDuz == 0)

    /************/

    // Log.warning("Dados", dados)

    // Log.info("Percentual de participação da dúzia 1: " + res.percDuz[0] + "%")
    // Log.info("Percentual de participação da dúzia 2: " + res.percDuz[1] + "%")
    // Log.info("Percentual de participação da dúzia 3: " + res.percDuz[2] + "%")

    // Exibe o último histórico de operação
    // logRd.length > 0 ? Log.warning("Histórico", logRd[logRd.length-1]) : ""

    /************/

    // Retorna o resultado
    return res
    
};// duasDuzias

/************/

exports.colunas = (dados) => {

    let res = {
        colunas: [],
        percCol: [],
    };

    // Log.info("colunas: dados.numeros", dados.numeros);
    Log.info("colunas: Último número sorteado: " + dados.numeros[dados.numeros.length-1]) 

    /************/

    // Separa cada número sorteado em colunas
    dados.numeros.forEach( num => {
        typeof res.colunas[0] == "undefined" ? res.colunas[0] = [] : ""
        typeof res.colunas[1] == "undefined" ? res.colunas[1] = [] : ""
        typeof res.colunas[2] == "undefined" ? res.colunas[2] = [] : ""
        col[0].includes(num) ? res.colunas[0].push(num) : ""
        col[1].includes(num) ? res.colunas[1].push(num) : ""
        col[2].includes(num) ? res.colunas[2].push(num) : ""
    })

    // Log.info("colunas: colunas", res.colunas);

    /************/

    // Obtém o tamanho da coluna
    let countCol = [];
    for (let i = 0; i <= 2; i++) {
        countCol[i] = res.colunas[i].length
    }// for (let i = 0; i <= 2; i++)

    // Log.info("colunas: countCol", countCol);

    /************/

    let somaColunas = (countCol[0] + countCol[1] + countCol[2])

    /************/

    // Obtém o percentual do tamanho da coluna
    for (let i = 0; i <= 2; i++) {
        res.percCol[i] = Decimals((countCol[i] / somaColunas * 100), 0)
    }// for (let i = 0; i <= 2; i++)

    // Log.info("colunas: perCol", res.percCol);

    /************/

    if (typeof dados.apoColTemp != "undefined" && dados.apoColTemp != null) {
        // console.log("dados.apoColTemp", dados.apoColTemp)
        dados.apostaCol  = dados.apoColTemp
        dados.apoColTemp = null
    }// (typeof dados.apoColTemp != "undefined" && dados.apoColTemp != null)

    /************/

    // Verifica se a coluna iniciou a rodada
    if (dados.rodadaCol > 0) {

        // Verifica as 3 colunas
        for (let i = 0; i <= 2; i++) {

            // Log.info("colunas: dados", dados)

            // último número sorteado é da coluna apostada
            if (col[i].includes(dados.numeros[dados.numeros.length-1]) && dados.apostaCol == i && dados.ventr > 0) {

                let tempLog = []
                tempLog[Date.now()] = {
                    banca:     dados.banca,
                    totalNum:  dados.numeros.length,
                    ultNum:    dados.numeros[dados.numeros.length-1],
                    rodadaCol: dados.rodadaCol,
                    valorCol:  dados.valorCol,
                    acumCol:   dados.acumCol,
                    apostaCol: dados.apostaCol,
                    percCol:   res.percCol,
                    acao:      "vitoria"
                }
                logRd.push(tempLog)

                Log.success("coluna sorteada: " + (i+1))
                // Log.info("colunas: Valor acumulado na coluna: " + dados.acumCol)
                // Log.info("colunas: Valor da entrada anterior: " + ventr[dados.rodadaCol-1])
                // Log.success("colunas: Ganhou: " + ((ventr[dados.rodadaCol-1] * 3) - dados.valorCol))
                
                // último número sorteado é da coluna 1
                dados.apostaCol  = null
                dados.banca     += (ventr[dados.rodadaCol-1] * 3) // Acrescenta o lucro
                dados.rodadaCol  = 0
                dados.ventr      = 0
                dados.valorCol   = 0
                dados.acumCol    = 0
                dados.vitCol++

                // Log.info("colunas: Novo saldo da banca " + dados.banca)
    
            } else if (dados.rodadaCol >= maxRd && dados.ventr > 0) {

                let tempLog = []
                tempLog[Date.now()] = {
                    banca:     dados.banca,
                    totalNum:  dados.numeros.length,
                    ultNum:    dados.numeros[dados.numeros.length-1],
                    rodadaCol: dados.rodadaCol,
                    valorCol:  dados.valorCol,
                    acumCol:   dados.acumCol,
                    apostaCol: dados.apostaCol,
                    percCol:   res.percCol,
                    acao:      "derrota"
                }
                logRd.push(tempLog)

                // Log.warning("colunas: perdeu! " + dados.acumCol)
                // Log.info("colunas: Novo saldo da banca " + dados.banca)
    
                // perdeu
                dados.apostaCol = null
                dados.rodadaCol = 0
                dados.ventr     = 0
                // dados.banca    -= dados.valorCol
                dados.valorCol  = 0
                dados.acumCol   = 0
                dados.derCol++
                
            } else if (dados.rodadaCol < maxRd && dados.rodadaCol > 0) {

                // Log.info("colunas: rodada menor que o máximo -> " + dados.rodadaCol);
    
                // O último número está na coluna
                if (col[i].includes(dados.numeros[dados.numeros.length-1])) {

                    let percSorted = [...res.percCol]
                    percSorted.sort((a, b) => a - b)
            
                    let duplicated = res.percCol.some((element, index) => {
                        return res.percCol.indexOf(element) !== index
                    })

                    /************/

                    if (duplicated) {

                        let tempLog = []
                        tempLog[Date.now()] = {
                            banca:     dados.banca,
                            totalNum:  dados.numeros.length,
                            ultNum:    dados.numeros[dados.numeros.length-1],
                            rodadaCol: dados.rodadaCol,
                            valorCol:  dados.valorCol,
                            acumCol:   dados.acumCol,
                            apostaCol: dados.apostaCol,
                            percCol:   res.percCol,
                            acao:      "empate colunas"
                        }
                        logRd.push(tempLog)

                        Log.warning("colunas: Aguarde o próximo sorteio...")

                        dados.apoColTemp = dados.apostaCol
                        dados.apostaCol  = null
                        dados.ventr      = 0
                        // dados.rodadaCol -= 1
                    
                    } else {

                        // A coluna sorteada tem a menor participação
                        // if (dados.apostaCol != res.percCol.indexOf(percSorted[0])) {
                        if (res.percCol[i] < res.percCol[i-1] && res.percCol[i] < res.percCol[i+1]) {

                            let tempLog = []
                            tempLog[Date.now()] = {
                                banca:     dados.banca,
                                totalNum:  dados.numeros.length,
                                ultNum:    dados.numeros[dados.numeros.length-1],
                                rodadaCol: dados.rodadaCol,
                                valorCol:  dados.valorCol,
                                acumCol:   dados.acumCol,
                                apostaCol: dados.apostaCol,
                                percCol:   res.percCol,
                                acao:      "mudança de coluna"
                            }
                            logRd.push(tempLog)
        
                            Log.info("colunas: Mudar jogo para coluna: " + (i+1))
                            Log.warning("colunas: Valor da entrada: " + ventr[dados.rodadaCol])

                            dados.apostaCol = i
                            dados.valorCol += ventr[dados.rodadaCol]
                            dados.acumCol  += ventr[dados.rodadaCol]
                            dados.banca    -= ventr[dados.rodadaCol]
                            dados.ventr     = ventr[dados.rodadaCol]
                            
                            Log.warning("colunas: Valor acumulado na coluna: " + dados.acumCol)

                        } else {

                            Log.info("colunas: Continuar na coluna: " + (dados.apostaCol+1))
                            Log.warning("colunas: Valor da entrada: R$ " + ventr[dados.rodadaCol])
                            
                            dados.valorCol += ventr[dados.rodadaCol]
                            dados.acumCol  += ventr[dados.rodadaCol]
                            dados.banca    -= ventr[dados.rodadaCol]
                            dados.ventr     = ventr[dados.rodadaCol]
                            
                            Log.warning("colunas: Valor acumulado na coluna: R$ " + dados.acumCol)

                        }// else if (res.percCol[i] < res.percCol[i-1] && res.percCol[i] < res.percCol[i+1])

                    }// else if (duplicated)

                } else if (dados.numeros[dados.numeros.length-1] == 0) {

                    // Ignora os zeros
                    dados.apostaCol  = null
                    dados.ventr      = 0
                    // dados.rodadaCol -= 1

                    Log.warning("colunas: Não contabilize o 0...")

                }// else if (dados.numeros[dados.numeros.length-1] == 0)
                
            }// else if (dados.rodadaCol < maxRd && dados.rodadaCol > 0)
    
        }// for (let i = 0; i <= 2; i++)

        /************/

        // Log.warning("colunas: Rodada: " + (dados.rodadaCol+1))

        // incrementa rodada até a 'maxRd' entrada
        if (dados.ventr > 0) dados.rodadaCol += 1
            
    }// if (dados.rodadaCol > 0)

    /************/

    // Começo do jogo
    if (dados.rodadaCol == 0) {

        let percSorted = [...res.percCol]
        percSorted.sort((a, b) => a - b)

        duplicated = res.percCol.some((element, index) => {
            return res.percCol.indexOf(element) !== index
        })

        /************/

        // Log.info("colunas: Jogo começou")
        if (duplicated == false) {

            if (dados.numeros[dados.numeros.length-1] == 0) {

                // Ignora os zeros
                dados.apostaCol  = null
                dados.ventr      = 0
                // dados.rodadaCol -= 1

                Log.warning("colunas: Não começa após o 0...")

            } else {

                // Log.warning("Rodada: " + (dados.rodadaCol+1))
                dados.apostaCol = res.percCol.indexOf(percSorted[0])
                
                Log.warning("colunas: Começando na coluna "+(dados.apostaCol+1)+"...")

                dados.rodadaCol += 1
                dados.valorCol   = ventr[0]
                dados.acumCol    = ventr[0]
                dados.banca     -= ventr[0]
                dados.ventr      = ventr[0]

                Log.info("colunas: Valor da entrada R$ " + dados.valorCol)

            }// if (dados.numeros[dados.numeros.length-1] == 0)

        } else {

            let tempLog = []
            tempLog[Date.now()] = {
                banca:     dados.banca,
                totalNum:  dados.numeros.length,
                ultNum:    dados.numeros[dados.numeros.length-1],
                rodadaCol: dados.rodadaCol,
                valorCol:  dados.valorCol,
                acumCol:   dados.acumCol,
                apostaCol: dados.apostaCol,
                percCol:   res.percCol,
                acao:      "novo jogo empate de colunas"
            }
            logRd.push(tempLog)

            Log.warning("colunas: Aguarde novo sorteio")

            dados.apostaCol = null
            dados.ventr     = 0

        }// else if (duplicated == false)
        
    }// if (dados.rodadaCol == 0)

    /************/

    // Log.info("colunas: Percentual de participação da coluna 1: " + res.percCol[0] + "%")
    // Log.info("colunas: Percentual de participação da coluna 2: " + res.percCol[1] + "%")
    // Log.info("colunas: Percentual de participação da coluna 3: " + res.percCol[2] + "%")

    // Exibe o último histórico de operação
    // logRd.length > 0 ? Log.warning("colunas: Histórico", logRd[logRd.length-1]) : ""

    /************/

    // Retorna o resultado
    return res
    
};// colunas

/************/

exports.duasColunas = (dados) => {

    let res = {
        colunas: [],
        percCol: [],
    }

    // Log.info("dados.numeros", dados.numeros);
    Log.info("duasColunas: Último número sorteado: " + dados.numeros[dados.numeros.length-1]) 

    /************/

    // Separa cada número sorteado em colunas
    dados.numeros.forEach( num => {
        typeof res.colunas[0] == "undefined" ? res.colunas[0] = [] : ""
        typeof res.colunas[1] == "undefined" ? res.colunas[1] = [] : ""
        typeof res.colunas[2] == "undefined" ? res.colunas[2] = [] : ""
        col[0].includes(num) ? res.colunas[0].push(num) : ""
        col[1].includes(num) ? res.colunas[1].push(num) : ""
        col[2].includes(num) ? res.colunas[2].push(num) : ""
    })

    // Log.info("duasColunas: colunas", res.colunas)

    /************/

    // Obtém o tamanho da coluna
    let countCol = [];
    for (let i = 0; i <= 2; i++) {
        countCol[i] = res.colunas[i].length
    }// for (let i = 0; i <= 2; i++)

    // Log.info("duasColunas: countCol", countCol)

    /************/

    let somaColunas = (countCol[0] + countCol[1] + countCol[2])

    /************/

    // Obtém o percentual do tamanho da coluna
    for (let i = 0; i <= 2; i++) {
        res.percCol[i] = Decimals((countCol[i] / somaColunas * 100), 0)
    }// for (let i = 0; i <= 2; i++)

    // Log.info("duasColunas: perCol", res.percCol);

    /************/

    if (typeof dados.apoColTemp != "undefined" && dados.apoColTemp != null) {
        // console.log("dados.apoColTemp", dados.apoColTemp)
        dados.apostaCol  = dados.apoColTemp
        dados.apoColTemp = null
    }// (typeof dados.apoColTemp != "undefined" && dados.apoColTemp != null)

    /************/

    // Verifica se a coluna iniciou a rodada
    if (dados.rodadaCol > 0) {

        // Verifica as 3 colunas
        for (let i = 0; i <= 2; i++) {

            // Log.info("duasColunas: dados", dados)

            // último número sorteado é da coluna apostada
            if (col[i].includes(dados.numeros[dados.numeros.length-1]) && (dados.apostaCol[0] == i || dados.apostaCol[1] == i)) {

                let tempLog = []
                tempLog[Date.now()] = {
                    banca:     dados.banca,
                    totalNum:  dados.numeros.length,
                    ultNum:    dados.numeros[dados.numeros.length-1],
                    rodadaCol: dados.rodadaCol,
                    valorCol:  dados.valorCol,
                    acumCol:   dados.acumCol,
                    apostaCol: dados.apostaCol,
                    percCol:   res.percCol,
                    acao:      "vitoria"
                }
                logRd.push(tempLog)

                // Log.success("duasColunas: Coluna sorteada: " + (i+1))
                // Log.info("duasColunas: Valor acumulado na coluna: R$ " + dados.acumCol)
                // Log.info("duasColunas: Valor da entrada anterior: R$ " + vent2[dados.rodadaCol-1])
                // Log.success("duasColunas: Ganhou: R$ " + ((vent2[dados.rodadaCol-1] * 3) - dados.acumCol))
                // Log.info("duasColunas: Saldo anterior da banca: R$ " + dados.banca)
                // Log.info("duasColunas: Valor a ser adicionado à banca: R$ " + (vent2[dados.rodadaCol-1] * 2))
                
                // último número sorteado é da coluna 1
                dados.apostaCol  = []
                dados.banca     += (vent2[dados.rodadaCol-1] * 3) // Acrescenta o lucro
                dados.rodadaCol  = 0
                dados.ventr      = 0
                dados.valorCol   = 0
                dados.acumCol    = 0
                dados.vitCol++
                
                // Log.info("duasColunas: Novo saldo da banca " + dados.banca)
    
            } else if (dados.rodadaCol >= maxRd) {

                let tempLog = []
                tempLog[Date.now()] = {
                    banca:     dados.banca,
                    totalNum:  dados.numeros.length,
                    ultNum:    dados.numeros[dados.numeros.length-1],
                    rodadaCol: dados.rodadaCol,
                    valorCol:  dados.valorCol,
                    acumCol:   dados.acumCol,
                    apostaCol: dados.apostaCol,
                    percCol:   res.percCol,
                    acao:      "derrota"
                }
                logRd.push(tempLog)

                // Log.warning("duasColunas: perdeu! " + dados.valorCol)
                // Log.info("duasColunas: Novo saldo da banca " + dados.banca)
    
                // perdeu
                dados.apostaCol = []
                dados.rodadaCol = 0
                dados.ventr     = 0
                // dados.banca    -= dados.valorCol
                dados.valorCol  = 0
                dados.acumCol   = 0
                dados.derCol++
                
            } else if (dados.rodadaCol < maxRd && dados.rodadaCol > 0) {

                // Log.info("duasColunas: rodada menor que o máximo -> " + dados.rodadaCol);
    
                // O último número está na coluna
                if (col[i].includes(dados.numeros[dados.numeros.length-1])) {

                    let percSorted = [...res.percCol]
                    percSorted.sort((a, b) => a - b)
            
                    let duplicated = res.percCol.some((element, index) => {
                        return res.percCol.indexOf(element) !== index
                    })

                    /************/

                    if (duplicated) {

                        let tempLog = []
                        tempLog[Date.now()] = {
                            banca:     dados.banca,
                            totalNum:  dados.numeros.length,
                            ultNum:    dados.numeros[dados.numeros.length-1],
                            rodadaCol: dados.rodadaCol,
                            valorCol:  dados.valorCol,
                            acumCol:   dados.acumCol,
                            apostaCol: dados.apostaCol,
                            percCol:   res.percCol,
                            acao:      "empate colunas"
                        }
                        logRd.push(tempLog)

                        // Log.warning("duasColunas: Aguarde o próximo sorteio...")

                        dados.apoColTemp = dados.apostaCol
                        dados.apostaCol  = []
                        dados.ventr      = 0
                        // dados.rodadaCol -= 1
                    
                    } else {

                        // A coluna sorteada tem a menor participação
                        if (res.percCol[i] < res.percCol[i-1] && res.percCol[i] < res.percCol[i+1]) {

                            let tempLog = []
                            tempLog[Date.now()] = {
                                banca:     dados.banca,
                                totalNum:  dados.numeros.length,
                                ultNum:    dados.numeros[dados.numeros.length-1],
                                rodadaCol: dados.rodadaCol,
                                valorCol:  dados.valorCol,
                                acumCol:   dados.acumCol,
                                apostaCol: dados.apostaCol,
                                percCol:   res.percCol,
                                acao:      "mudança de coluna"
                            }
                            logRd.push(tempLog)
        
                            Log.info("duasColunas: Mudar jogo para coluna: " + (dados.apostaCol[0]+1)+" e "+(dados.apostaCol[1]+1))
                            Log.warning("duasColunas: Valor da entrada: " + vent2[dados.rodadaCol])

                            dados.apostaCol[0] = res.percCol.indexOf(percSorted[0])
                            dados.apostaCol[1] = res.percCol.indexOf(percSorted[1])
                            dados.valorCol    += vent2[dados.rodadaCol]
                            dados.acumCol     += vent2[dados.rodadaCol]*2
                            dados.banca       -= vent2[dados.rodadaCol]*2
                            dados.ventr        = vent2[dados.rodadaCol]
                            
                            Log.warning("duasColunas: Valor acumulado na coluna: " + dados.acumCol)

                        } else {
    
                            Log.info("duasColunas: Continuar na coluna: " + (dados.apostaCol[0]+1)+" e "+(dados.apostaCol[1]+1))
                            Log.warning("duasColunas: Valor da entrada: " + vent2[dados.rodadaCol])
                            
                            dados.valorCol += vent2[dados.rodadaCol]
                            dados.acumCol  += vent2[dados.rodadaCol]*2
                            dados.banca    -= vent2[dados.rodadaCol]*2
                            dados.ventr     = vent2[dados.rodadaCol]

                        }// else if (res.percCol[i] < res.percCol[i-1] && res.percCol[i] < res.percCol[i+1])
                        
                        // Log.warning("duasColunas: Valor acumulado na coluna: R$ " + dados.acumCol)
        
                    }// else if (duplicated)
    
                } else if (dados.numeros[dados.numeros.length-1] == 0) {
        
                    // Ignora os zeros
                    dados.apostaCol  = []
                    dados.ventr      = 0
                    // dados.rodadaCol -= 1

                    Log.warning("duasColunas: Não contabilize o 0...")
        
                }// if (col[i].includes(dados.numeros[dados.numeros.length-1]))
                
            }// else if (dados.rodadaCol < maxRd && dados.rodadaCol > 0)
    
        }// for (let i = 0; i <= 2; i++)

        /************/

        // Log.warning("duasColunas: Rodada: " + (dados.rodadaCol+1))

        // incrementa rodada até a 'maxRd' entrada
        if (dados.ventr > 0) dados.rodadaCol += 1
            
    }// if (dados.rodadaCol > 0)

    /************/

    // Começo do jogo
    if (dados.rodadaCol == 0) {

        let percSorted = [...res.percCol]
        percSorted.sort((a, b) => a - b)

        duplicated = res.percCol.some((element, index) => {
            return res.percCol.indexOf(element) !== index
        })

        /************/

        // Log.info("duasColunas: Jogo começou")
        if (duplicated == false) {

            if (dados.numeros[dados.numeros.length-1] == 0) {

                // Ignora os zeros
                dados.apostaCol = null
                dados.ventr     = 0
                // dados.rodadaCol -= 1

                Log.warning("duasColunas: Não começa após o 0...")

            } else {

                // Log.warning("Rodada: " + (dados.rodadaCol+1))
                dados.apostaCol[0] = res.percCol.indexOf(percSorted[0]);
                dados.apostaCol[1] = res.percCol.indexOf(percSorted[1]);
                
                Log.warning("duasColunas: Começando na coluna "+(dados.apostaCol[0]+1)+" e "+(dados.apostaCol[1]+1)+"...")

                dados.rodadaCol += 1
                dados.valorCol   = vent2[0]
                dados.acumCol    = vent2[0]*2
                dados.banca     -= vent2[0]*2
                dados.ventr      = vent2[0]

                Log.info("duasColunas: Valor da entrada R$ " + dados.valorCol)

            }// if (dados.numeros[dados.numeros.length-1] == 0)

        } else {

            let tempLog = []
            tempLog[Date.now()] = {
                banca:      dados.banca,
                totalNum:   dados.numeros.length,
                ultNum:     dados.numeros[dados.numeros.length-1],
                rodadaCol:  dados.rodadaCol,
                valorCol:   dados.valorCol,
                acumCol:    dados.acumCol,
                apostaCol:  dados.apostaCol,
                percCol:    res.percCol,
                acao:       "novo jogo empate de colunas"
            }
            logRd.push(tempLog)

            Log.warning("duasColunas: Aguarde novo sorteio")

            dados.apostaCol = []
            dados.ventr     = 0

        }// else if (duplicated == false)

        // dados.apostaCol.length == 2 ? dados.rodadaCol += 1 : ""

    }// if (dados.rodadaCol == 0)

    /************/

    // Log.warning("duasColunas: Dados", dados)

    Log.info("duasColunas: Percentual de participação da coluna 1: " + res.percCol[0] + "%")
    Log.info("duasColunas: Percentual de participação da coluna 2: " + res.percCol[1] + "%")
    Log.info("duasColunas: Percentual de participação da coluna 3: " + res.percCol[2] + "%")

    // Exibe o último histórico de operação
    // logRd.length > 0 ? Log.warning("duasColunas: Histórico", logRd[logRd.length-1]) : ""

    /************/

    // Retorna o resultado
    return res

};// duasColunas

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
