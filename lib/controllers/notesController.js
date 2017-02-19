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

function setFavouriteNote(options) {
	if (!options) return Promise.reject('Invalid object');
	var findQuery = {_id:options.id};
	var updateQuery = {isFav: true};
	return NoteModel.findOneAndUpdate(findQuery, updateQuery);
}

module.exports = {
    addNote: addNote,
	getNotes: getNotes,
	setFav: setFavouriteNote
};