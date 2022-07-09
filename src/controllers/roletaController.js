const roleta = require('../roleta');
const user = {};

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

    if (typeof user[userID] == "undefined") {
        
        user[userID] = {
            vitDuz:    0,
            derDuz:    0,
            valorDuz:  [0,0,0],
            rodadaDuz: [0,0,0],
            vitCol:    0,
            derCol:    0,
            valorCol:  [0,0,0],
            rodadaCol: [0,0,0],
            vitMet:    0,
            derMet:    0,
            valorMet:  [0,0],
            rodadaMet: [0,0],
            vitPIs:    0,
            derPIs:    0,
            valorPIs:  [0,0],
            rodadaPIs: [0,0],
            vitVPs:    0,
            derVPs:    0,
            valorVPs:  [0,0],
            rodadaVPs: [0,0],
        }

    }// if (typeof user[userID] == "undefined")

    error ? res.send(error): "no error";

    if (!error) {

        let dados = {
            userID:     req.body.userID,
            numeros:    req.body.numeros,
            banca:      req.body.banca,
            vitDuz:     user[userID].vitDuz,
            derDuz:     user[userID].derDuz,
            valorDuz:   user[userID].valorDuz,
            rodadaDuz:  user[userID].rodadaDuz,
            vitCol:     user[userID].vitCol,
            derCol:     user[userID].derCol,
            valorCol:   user[userID].valorCol,
            rodadaCol:  user[userID].rodadaCol,
            vitMet:     user[userID].vitMet,
            derMet:     user[userID].derMet,
            valorMet:   user[userID].valorMet,
            rodadaMet:  user[userID].rodadaMet,
            vitPIs:     user[userID].vitPIs,
            derPIs:     user[userID].derPIs,
            valorPIs:   user[userID].valorPIs,
            rodadaPIs:  user[userID].rodadaPIs,
            vitVPs:     user[userID].vitVPs,
            derVPs:     user[userID].derVPs,
            valorVPs:   user[userID].valorVPs,
            rodadaVPs:  user[userID].rodadaVPs,
        };

        res.status(201).send(roleta.jogar(dados));

    }// if (!error)

};

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
