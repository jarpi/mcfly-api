"use strict";
/* jshint node: true */
/* global require, Promise, console, process */

console.dir(__dirname);
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('./lib/config.json');
var app = express();
var routes = require('./lib/routes/index.js');

var port = process.env.port || 8080;
app.use(bodyParser.urlencoded({
        extended: false
    }));
app.use(bodyParser.json());
mongoose.Promise = global.Promise;

function initHttp() {
    return new Promise(function(resolve, reject) {
        app.listen(port, function(err) {
            if (err) {
                return reject(err);
            }
            return resolve(true);
        });
    });
}

function initDB() {
    return new Promise(function(resolve, reject) {
        mongoose.connection.on('error', function(err){
            console.dir(err);
        });

        mongoose.connection.once('open', function(){
            console.log('Connection to DB initialized!');
        });

        mongoose.connect(config.db_host, function(err){
            if (err) {
                return reject(err);
            }
            return resolve(true);
        });
    });
}

initHttp()
    .then(function() {
        console.log('app initialized on port ' + port);
    })
    .then(initDB)
    .then(function() {
        return routes(app);
    })
    .catch(function(err) {
        console.dir(err);
    });

