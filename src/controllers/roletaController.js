const roleta = require('../roleta');
const User = {};

/************/

exports.post = (req, res, next) => {

    // console.log("req.body: ", req.body);

    // Analisa variáveis
    error = false;
    error = typeof req.body.userID == "undefined" ? "ID de usuários não preenchido" : false;
    error = typeof req.body.numeros == "undefined" ? "numeros não preenchido" : false;
    error = typeof req.body.banca == "undefined" ? "banca não preenchido" : false;
    // error = typeof req.body.vitDuz == "undefined" ? "vitDuz não preenchido" : false;
    // error = typeof req.body.derDuz == "undefined" ? "derDuz não preenchido" : false;
    // error = typeof req.body.valorDuz == "undefined" ? "valorDuz não preenchido" : false;
    // error = typeof req.body.rodadaDuz == "undefined" ? "rodadaDuz não preenchido" : false;
    // error = typeof req.body.vitCol == "undefined" ? "vitCol não preenchido" : false;
    // error = typeof req.body.derCol == "undefined" ? "derCol não preenchido" : false;
    // error = typeof req.body.valorCol == "undefined" ? "valorCol não preenchido" : false;
    // error = typeof req.body.rodadaCol == "undefined" ? "rodadaCol não preenchido" : false;
    // error = typeof req.body.vitMet == "undefined" ? "vitMet não preenchido" : false;
    // error = typeof req.body.derMet == "undefined" ? "derMet não preenchido" : false;
    // error = typeof req.body.valorMet == "undefined" ? "valorMet não preenchido" : false;
    // error = typeof req.body.rodadaMet == "undefined" ? "rodadaMet não preenchido" : false;
    // error = typeof req.body.vitPIs == "undefined" ? "vitPIs não preenchido" : false;
    // error = typeof req.body.derPIs == "undefined" ? "derPIs não preenchido" : false;
    // error = typeof req.body.valorPIs == "undefined" ? "valorPIs não preenchido" : false;
    // error = typeof req.body.rodadaPIs == "undefined" ? "rodadaPIs não preenchido" : false;
    // error = typeof req.body.vitVPs == "undefined" ? "vitVPs não preenchido" : false;
    // error = typeof req.body.derVPs == "undefined" ? "derVPs não preenchido" : false;
    // error = typeof req.body.valorVPs == "undefined" ? "valorVPs não preenchido" : false;
    // error = typeof req.body.rodadaVPs == "undefined" ? "rodadaVPs não preenchido" : false;
    
    userID = req.body.userID;

    if (typeof User[userID] == "undefined") {
        
        User[userID] = {
            ventr:     0,

            vitDuz:    0,
            derDuz:    0,
            valorDuz:  0,
            rodadaDuz: 0,

            vitCol:    0,
            derCol:    0,
            valorCol:  0,
            rodadaCol: 0,
            apostaCol: 0,

            vitMet:    0,
            derMet:    0,
            valorMet:  0,
            rodadaMet: 0,
            apostaMet: 0,

            vitPIs:    0,
            derPIs:    0,
            valorPIs:  0,
            rodadaPIs: 0,
            apostaPIs: 0,

            vitVPs:    0,
            derVPs:    0,
            valorVPs:  0,
            rodadaVPs: 0,
            apostaVPs: 0,
        }

        req.body.estDuzias == 2 ? User[userID].apostaDuz = [] : User[userID].apostaDuz = 0

        // console.log("novo usuário", User[userID])

    }// if (typeof User[userID] == "undefined")

    error ? res.send(error): "no error";

    if (!error) {

        // console.log("User[userID]", User[userID])

        let dados = {
            userID:     req.body.userID,
            numeros:    req.body.numeros,
            estDuzias:  req.body.estDuzias,
            testes:     req.body.testes,
            ventr:      User[userID].ventr,

            vitDuz:     User[userID].vitDuz,
            derDuz:     User[userID].derDuz,
            valorDuz:   User[userID].valorDuz,
            rodadaDuz:  User[userID].rodadaDuz,
            apostaDuz:  User[userID].apostaDuz,

            vitCol:     User[userID].vitCol,
            derCol:     User[userID].derCol,
            valorCol:   User[userID].valorCol,
            rodadaCol:  User[userID].rodadaCol,
            apostaCol:  User[userID].apostaCol,

            vitMet:     User[userID].vitMet,
            derMet:     User[userID].derMet,
            valorMet:   User[userID].valorMet,
            rodadaMet:  User[userID].rodadaMet,
            apostaMet:  User[userID].apostaMet,

            vitPIs:     User[userID].vitPIs,
            derPIs:     User[userID].derPIs,
            valorPIs:   User[userID].valorPIs,
            rodadaPIs:  User[userID].rodadaPIs,
            apostaPIs:  User[userID].apostaPIs,

            vitVPs:     User[userID].vitVPs,
            derVPs:     User[userID].derVPs,
            valorVPs:   User[userID].valorVPs,
            rodadaVPs:  User[userID].rodadaVPs,
            apostaVPs:  User[userID].apostaVPs,
        };

        dados.banca = User[userID].banca ? User[userID].banca : req.body.banca;
        typeof req.body.estDuzias != typeof User[userID].apostaDuz ? User[userID].apostaDuz = req.body.estDuzias : ""

        // Jogar
        let rodada = roleta.jogar(dados)

        if (typeof rodada == "object") {

            User[userID].ventr      = rodada.ventr
            User[userID].banca      = rodada.banca

            User[userID].vitDuz     = rodada.vitDuz
            User[userID].derDuz     = rodada.derDuz
            User[userID].valorDuz   = rodada.valorDuz
            User[userID].rodadaDuz  = rodada.rodadaDuz
            User[userID].apostaDuz  = rodada.apostaDuz

            User[userID].vitCol     = rodada.vitCol
            User[userID].derCol     = rodada.derCol
            User[userID].valorCol   = rodada.valorCol
            User[userID].rodadaCol  = rodada.rodadaCol
            User[userID].apostaCol  = rodada.apostaCol

            User[userID].vitMet     = rodada.vitMet
            User[userID].derMet     = rodada.derMet
            User[userID].valorMet   = rodada.valorMet
            User[userID].rodadaMet  = rodada.rodadaMet
            User[userID].apostaMet  = rodada.apostaMet

            User[userID].vitPIs     = rodada.vitPIs
            User[userID].derPIs     = rodada.derPIs
            User[userID].valorPIs   = rodada.valorPIs
            User[userID].rodadaPIs  = rodada.rodadaPIs
            User[userID].apostaPIs  = rodada.apostaPIs

            User[userID].vitVPs     = rodada.vitVPs
            User[userID].derVPs     = rodada.derVPs
            User[userID].valorVPs   = rodada.valorVPs
            User[userID].rodadaVPs  = rodada.rodadaVPs
            User[userID].apostaVPs  = rodada.apostaVPs

        }// if (typeof rodada == object)

        // console.log("rodada", rodada)

        res.status(201).send(rodada)

    }// if (!error)

}

exports.reset = (req, res, next) => {

    userID = req.body.userID;

    User[userID] = {
        numeros:   [],

        ventr:     0,

        vitDuz:    0,
        derDuz:    0,
        valorDuz:  0,
        rodadaDuz: 0,
        apostaDuz: 0,

        vitCol:    0,
        derCol:    0,
        valorCol:  0,
        rodadaCol: 0,
        apostaCol: 0,

        vitMet:    0,
        derMet:    0,
        valorMet:  0,
        rodadaMet: 0,
        apostaMet: 0,

        vitPIs:    0,
        derPIs:    0,
        valorPIs:  0,
        rodadaPIs: 0,
        apostaPIs: 0,

        vitVPs:    0,
        derVPs:    0,
        valorVPs:  0,
        rodadaVPs: 0,
        apostaVPs: 0,
    }

}

// exports.get = (req, res, next) => {
//     console.log("req.params: ", req.params);
//     console.log("req.body: ", req.body);
//     console.log("req.query: ", req.query);
//     res.status(201).send('Requisição recebida via GET com sucesso!');
// };

// exports.put = (req, res, next) => {
//     console.log("req.params: ", req.params);
//     console.log("req.body: ", req.body);
//     console.log("req.query: ", req.query);
//     let id = req.params.id;
//     res.status(201).send(`Requisição recebida via PUT com sucesso! ${id}`);
// };

// exports.delete = (req, res, next) => {
//     let id = req.params.id;
//     res.status(200).send(`Requisição recebida com sucesso!! ${id}`);
// };
