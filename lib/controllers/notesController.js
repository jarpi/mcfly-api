var NoteModel = require('../models/notesModel.js');

function addNote(noteObject) {
    if (!noteObject) return Promise.reject('Invalid object');
    var note = new NoteModel(noteObject);
    return note.save();
}

module.exports = {
    addNote: addNote
};