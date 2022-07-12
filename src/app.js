const express    = require('express');
const app        = express();
const cors       = require('cors');
const router     = express.Router();
const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }))

// Content-Type: x-www-form-urlencoded
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

//Rotas
const index     = require('./routes/index');
const calcRoute = require('./routes/calcRoute');
const resetRoute = require('./routes/resetRoute');

app.use('/', index);
app.use('/calc', calcRoute);
app.use('/reset', resetRoute);

module.exports = app;
