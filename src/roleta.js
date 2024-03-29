const Log        = require("./Logs")
const Strategies = require("./Strategies")

/************/

exports.jogar = (dados) => {

    // Log.info("Dados", dados)

    // Conta zeros
    let zeros = 0

    /************/

    dados.numeros.forEach(num => {
        num == 0 ? zeros++ : ""
    })

    /************/

    // Aguarda os 12 útimos números sorteados para iniciar a análise probabilística
    if ((dados.numeros.length - zeros) > 12) {

        dados.numeros    = dados.numeros.map(Number)
        dados.banca      = Number(dados.banca)
        dados.ventr      = Number(dados.ventr)
        dados.estDuzias  = Number(dados.estDuzias)
        dados.estColunas = Number(dados.estColunas)
        dados.operacaoTestes = Number(dados.operacaoTestes)

        /************/

        // Dúzias
        dados.vitDuz    = Number(dados.vitDuz)
        dados.derDuz    = Number(dados.derDuz)
        dados.valorDuz  = Number(dados.valorDuz)
        dados.acumDuz   = Number(dados.acumDuz)
        dados.rodadaDuz = Number(dados.rodadaDuz)
        if (dados.estDuzias == 1) dados.apostaDuz = Number(dados.apostaDuz)

        // Colunas
        dados.vitCol    = Number(dados.vitCol)
        dados.derCol    = Number(dados.derCol)
        dados.valorCol  = Number(dados.valorCol)
        dados.acumCol   = Number(dados.acumCol)
        dados.rodadaCol = Number(dados.rodadaCol)
        if (dados.estColunas == 1) dados.apostaCol = Number(dados.apostaCol)

        // Metades
        dados.vitMet    = Number(dados.vitMet)
        dados.derMet    = Number(dados.derMet)
        dados.valorMet  = Number(dados.valorMet)
        dados.acumMet   = Number(dados.acumMet)
        dados.rodadaMet = Number(dados.rodadaMet)
        dados.apostaMet = Number(dados.apostaMet)

        // Pares e Ímpares
        dados.vitPIs    = Number(dados.vitPIs)
        dados.derPIs    = Number(dados.derPIs)
        dados.valorPIs  = Number(dados.valorPIs)
        dados.acumPIs   = Number(dados.acumPIs)
        dados.rodadaPIs = Number(dados.rodadaPIs)
        dados.apostaPIs = Number(dados.apostaPIs)

        // Vermelhos e Pretos
        dados.vitVPs    = Number(dados.vitVPs)
        dados.derVPs    = Number(dados.derVPs)
        dados.valorVPs  = Number(dados.valorVPs)
        dados.acumVPs   = Number(dados.acumVPs)
        dados.rodadaVPs = Number(dados.rodadaVPs)
        dados.apostaVPs = Number(dados.apostaVPs)

        /************/

        // Elimina números antigos
        while (dados.numeros.length > 500) {
            dados.numeros.shift()
        }// while (dados.numeros.length > 500)

        /************/
        
        // Testes
        if (dados.operacaoTestes == 1) {

            // console.log("length", dados.numeros.length)

            let numeros = [...dados.numeros]
            let arrNum  = []

            dados.numeros.forEach((v, i) => {

                // console.log("index", i)
                // console.log("value", v)

                arrNum.push(v)

                if (i >= 12) {

                    dados.numeros = [...arrNum]
                    dados.duzias  = (dados.estDuzias == 1) ? Strategies.duzias(dados) : Strategies.duasDuzias(dados)
                    dados.colunas = (dados.estColunas == 1) ? Strategies.colunas(dados) : Strategies.duasColunas(dados)

                }// if (i >= 12)

            })// dados.numeros.forEach

            dados.numeros = [...numeros]

            // Executa o teste somente na importação de números
            dados.operacaoTestes = 2

        } else {

            dados.duzias  = (dados.estDuzias == 1) ? Strategies.duzias(dados) : Strategies.duasDuzias(dados)
            dados.colunas = (dados.estColunas == 1) ? Strategies.colunas(dados) : Strategies.duasColunas(dados)

        }// else if (dados.operacaoTestes == 1)

        // dados.metades       = Strategies.metades(dados)
        // dados.paresImpares  = Strategies.paresImpares(dados)
        // dados.vermelhoPreto = Strategies.vermelhoPreto(dados)

        // Strategies.duzias(dados)
        // Strategies.colunas(dados)
        // Strategies.metades(dados)
        // Strategies.paresImpares(dados)
        // Strategies.vermelhoPreto(dados)

        /************/

        return dados

    } else {

        Log.warning("Informe pelo menos 12 números além do zero...", dados.numeros)
        return "Informe pelo menos 12 números além do zero..."

    }// else if ((dados.numeros.length - zeros) > 12)

};// function jogar(numeros)
