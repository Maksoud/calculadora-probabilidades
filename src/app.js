const express = require('express');
const app     = express();
const router  = express.Router();

//Rotas
const index         = require('./routes/index');
const addNumRoute   = require('./routes/addNumRoute');
const addBancaRoute = require('./routes/addBancaRoute');

app.use('/', index);
app.use('/addNum', addNumRoute);
app.use('/addBanca', addBancaRoute);

module.exports = app;
