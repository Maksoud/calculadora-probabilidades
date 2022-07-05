const Log        = require("./Logs");
const Strategies = require("./Strategies");

/************/

exports.jogar = (dados) => {

    // Aguarda os 9 útimos números sorteados para iniciar a análise probabilística
    if (dados.numeros.length >= 12) {

        switch (dados.modalidade) {

            // 'duzias', 'linhas', 'metades', 'pares-ímpares', 'vermelho-preto'
            case 'duzias':

                // Log.success('duzias');
                return Strategies.duzias(dados);

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
                Log.warning('Comando não reconhecido');
                return "Comando não reconhecido";
                break;

        }// switch (dados.modalidade)

    } else {

        Log.warning("Aguardando demais números", dados.numeros);
        return "Aguardando demais números...";

    }// if (dados.numeros.length >= 12)

};// function jogar(numeros)
