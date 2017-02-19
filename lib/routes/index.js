"use strict";
module.exports = function(app) {
    var notesRouter = require('./notesRouter.js');
    return notesRouter()
        .then(function(router){
            app.use('/', router);
            return;
        });
};