var express = require('express');
var router = express.Router();
var notesController = require('../controllers/notesController.js');

function notesEndpoint() {
    router.get('/test', function(req, res) {
        return res.status(200);
    });

    router.get('/notes', function(req, res) {
        return notesController.getNotes({})
            .then(function(notes){
                res.status(200).json(notes);
            })
            .catch(function(err){
                res.status(500).json(err);
            });
    });

    router.get('/note/:id', function(req, res) {
        return notesController.getNotes({id:req.params.id})
            .then(function(note){
                res.status(200).json(note);
            })
            .catch(function(err){
                res.status(500).json(err);
            });
    });

    router.get('/notes/favs', function(req, res) {
        return notesController.getNotes({isFavouriteNotes:true})
            .then(function(notes){
                res.status(200).json(notes);
            })
            .catch(function(err){
                res.status(500).json(err);
            });
    });

    router.post('/note', function(req, res) {
        var body = req.body;
        body.created = new Date();
        return notesController.addNote(body)
            .then(function(note){
                res.status(201).json({id:note._id});
            })
            .catch(function(err){
                res.status(500).json(err);
            });
    });

    router.post('/note/:id/fav', function(req, res) {
        return notesController.setFav({id: req.params.id})
            .then(function(){
                res.sendStatus(204);
            })
            .catch(function(err){
                res.status(500).json(err);
            });
    });
    return;
}

module.exports = function(){
    return Promise.resolve()
        .then(function() {
            return notesEndpoint();
        })
        .then(function() {
            return router;
        });
};