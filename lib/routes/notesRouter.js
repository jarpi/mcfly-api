var express = require('express');
var router = express.Router();

function notesEndpoint(router) {
    return Promise.resolve()
    .then(function(){
        router.get('/test', function(req, res) {
            return res.sendStatus(200);
        });

        router.get('/notes', function(req, res) {
            res.sendStatus(200);
        });

        router.get('/note/:id', function(req, res) {
            res.sendStatus(200);
        });

        router.post('/note/:id/fav', function(req, res) {
            res.sendStatus(200);
        });

        router.get('/notes/favs', function(req, res) {
            res.sendStatus(200);
        });

        router.post('/note', function(req, res) {
            res.sendStatus(200);
        });
    });
}

module.exports = function(){
return notesEndpoint(router)
        .then(function(){
            return router;
        });
};