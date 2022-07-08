const roleta = require('../roleta');

/************/

exports.post = (req, res, next) => {

    // console.log("req.body: ", req.body);

    let dados = {
        numeros:    req.body.numeros,
        banca:      req.body.banca,
        vitDuz:     req.body.vitDuz,
        derDuz:     req.body.derDuz,
        valorDuz:   req.body.valorDuz,
        rodadaDuz:  req.body.rodadaDuz,
        vitCol:     req.body.vitCol,
        derCol:     req.body.derCol,
        valorCol:   req.body.valorCol,
        rodadaCol:  req.body.rodadaCol,
        vitMet:     req.body.vitMet,
        derMet:     req.body.derMet,
        valorMet:   req.body.valorMet,
        rodadaMet:  req.body.rodadaMet,
        vitPIs:     req.body.vitPIs,
        derPIs:     req.body.derPIs,
        valorPIs:   req.body.valorPIs,
        rodadaPIs:  req.body.rodadaPIs,
        vitVPs:     req.body.vitVPs,
        derVPs:     req.body.derVPs,
        valorVPs:   req.body.valorVPs,
        rodadaVPs:  req.body.rodadaVPs,
    };

    res.status(201).send(roleta.jogar(dados));

};

/*
    {
        "duz1": [
            2,
            12,
            9,
            5,
            1,
            5
        ],
        "duz2": [
            13,
            22,
            17,
            21
        ],
        "duz3": [
            25,
            27
        ],
        "percDuz": [
            50,
            33,
            16
        ],
        "numeros": [
            25,
            27,
            2,
            13,
            12,
            9,
            5,
            1,
            22,
            5,
            17,
            21
        ],
        "valorDuz": [
            0,
            0,
            0
        ],
        "rodadaDuz": [
            0,
            0,
            0
        ],
        "banca": 1310,
        "vitorias": 7,
        "derrotas": 3
    }
*/

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
