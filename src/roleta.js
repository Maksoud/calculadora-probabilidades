const Log        = require("./Logs");
const Strategies = require("./Strategies");

/************/

exports.jogar = (dados) => {

    // Log.info("Dados", dados);

    // Aguarda os 9 útimos números sorteados para iniciar a análise probabilística
    if (dados.numeros.length >= 12) {

        dados.numeros   = dados.numeros.map(Number);
        dados.banca     = Number(dados.banca);

        /************/

        // Dúzias
        dados.vitDuz    = Number(dados.vitDuz);
        dados.derDuz    = Number(dados.derDuz);
        dados.valorDuz  = dados.valorDuz.map(Number);
        dados.rodadaDuz = dados.rodadaDuz.map(Number);

        // Colunas
        dados.vitCol    = Number(dados.vitCol);
        dados.derCol    = Number(dados.derCol);
        dados.valorCol  = dados.valorCol.map(Number);
        dados.rodadaCol = dados.rodadaCol.map(Number);

        // Metades
        dados.vitMet    = Number(dados.vitMet);
        dados.derMet    = Number(dados.derMet);
        dados.valorMet  = dados.valorMet.map(Number);
        dados.rodadaMet = dados.rodadaMet.map(Number);

        // Pares e Ímpares
        dados.vitPIs    = Number(dados.vitPIs);
        dados.derPIs    = Number(dados.derPIs);
        dados.valorPIs  = dados.valorPIs.map(Number);
        dados.rodadaPIs = dados.rodadaPIs.map(Number);

        // Vermelhos e Pretos
        dados.vitVPs    = Number(dados.vitVPs);
        dados.derVPs    = Number(dados.derVPs);
        dados.valorVPs  = dados.valorVPs.map(Number);
        dados.rodadaVPs = dados.rodadaVPs.map(Number); 

        /************/

        // Elimina números antigos
        while (dados.numeros.length > 200) {
            dados.numeros.shift();
        }// while (dados.numeros.length > 200)

        /************/

        dados.duzias        = Strategies.duzias(dados);
        // dados.colunas       = Strategies.colunas(dados);
        // dados.metades       = Strategies.metades(dados);
        // dados.paresImpares  = Strategies.paresImpares(dados);
        // dados.vermelhoPreto = Strategies.vermelhoPreto(dados);

        /************/

        return dados;

    } else {

        Log.warning("Informe pelo menos 12 números...", dados.numeros);
        return "Informe pelo menos 12 números...";

    }// if (dados.numeros.length >= 12)

};// function jogar(numeros)
