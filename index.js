const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes/api');

const app = express();

mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

app.listen(process.env.port || 3000, function () {
    console.log('now listening for requests');
});

app.use('/api', router);

//error handling middleware
app.use(function (err, req, res, next) {
    res.status(422).send({error:err.message});
});