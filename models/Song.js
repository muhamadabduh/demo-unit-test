const mongoose = require('mongoose')

const songSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    artist: {
        type: String,
        required: [true, 'Artist is required']
    }, 
    lyrics: {
        type: String
    }
})

const Song = mongoose.model('Song', songSchema)

module.exports = Song