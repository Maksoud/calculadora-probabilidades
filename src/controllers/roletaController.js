exports.post = (req, res, next) => {
    console.log("params: ", req.params);
    console.log("body: ", req.body);
    console.log("query: ", req.query);
    console.log(JSON.stringify(req.body));
    console.log("req", req);
    res.status(201).send('Requisição recebida com sucesso!!!');
    next();
};

// exports.put = (req, res, next) => {
//     let id = req.params.id;
//     res.status(201).send(`Requisição recebida com sucesso@! ${id}`);
// };

// exports.delete = (req, res, next) => {
//     let id = req.params.id;
//     res.status(200).send(`Requisição recebida com sucesso!! ${id}`);
// };
