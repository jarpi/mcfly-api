var mongoose = require('mongoose');
var noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is mandatory']
    },

    body: {
        type: String,
        required: [true, 'Body is  mandatory']
    },

    created: {
        type: Date
    },

    isFav: {
        type: Boolean
    }
});

module.exports = mongoose.model( 'Note' , noteSchema);