var mongoose = require('mongoose');
var noteSchema = new mongoose.Schema({
     title: {type: String},
     text: {type: String},
     created: {type: Date},
     isFav: {type: Boolean}
});

module.exports = mongoose.model( 'Note' , noteSchema);