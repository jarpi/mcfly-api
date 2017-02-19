var NoteModel = require('../models/notesModel.js');

function addNote(noteObject) {
    if (!noteObject) return Promise.reject('Invalid object');
    var note = new NoteModel(noteObject);
    return note.save();
}

function getNotes(options) {
    var query = {};
    if (options && options.id) query._id = options.id;
    if (options && options.isFavouriteNotes) query.isFav = true;
    return NoteModel.find(query);
}

module.exports = {
    addNote: addNote,
    getNotes: getNotes
};