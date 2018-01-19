const http = require('http');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// app config
const config = Object.assign(
    require(__dirname + '/config/' + (process.env.NODE_ENV || 'development')),
    JSON.parse(process.env.CONFIG || '{}')
);

// show exception in console
process.on('uncaughtException', function (error) {
    console.log(error.stack);
});

// Access-Control
app.use(cors({
    origin: '*'
}));

// DB connect and make models
mongoose.connect('mongodb://' + config.db);
fs.readdirSync(__dirname + '/models').forEach(function (model) {
    require(__dirname + '/models/' + model)
});

// set json body parser
app.use(bodyParser.json());

// create routes
fs.readdirSync(__dirname + '/routes').forEach(function (file) {
    app.use(require(__dirname + '/routes/' + file));
});

// start server
http.createServer(app).listen(config.http.port || process.env.PORT);

console.log('Starting the server...');
