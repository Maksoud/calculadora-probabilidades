
const Log    = require("./class/Logs");
const Roleta = require("./roleta");

/***********************************************************/

// Adiciona novos números
Roleta.addNumero([25,27,2,13,12,9,5,1,22,5,17,21]);

// Modalidade, número da entrada
let modalidade  = "duzias";

// Banca inicial
Roleta.addBanca(1200);

// Número da entrada
let nentrada = 0; // começando agora

// Calcula probabilidade (Números sorteados, modalidade, número da entrada)
Roleta.jogar(modalidade, nentrada);

// Exibe resultado
Log.info("Resultado da Análise: ", Roleta.getResultado());