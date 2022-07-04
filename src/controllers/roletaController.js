const roleta = require('../roleta');

/************/

exports.post = (req, res, next) => {

    // console.log("req.body: ", req.body);

    let dados = {
        numeros:    req.body.numeros,
        banca:      req.body.banca,
        valorDez:   req.body.valorDez,
        rodadaDez:  req.body.rodadaDez,
        modalidade: req.body.modalidade,
        vitorias:   req.body.vitorias,
        derrotas:   req.body.derrotas
    };

    let result = roleta.jogar(dados);

    // console.log("Resultado da Análise:", result);

    res.status(201).send(result);

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
        "valorDez": [
            0,
            0,
            0
        ],
        "rodadaDez": [
            0,
            0,
            0
        ],
        "banca": 1310,
        "vitorias": 7,
        "derrotas": 3
    }
    */

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
