const Song = require('../models/Song')
const axios = require('axios')
const api3 = 'https://api.lyrics.ovh/v1'

class Controller {
    static create(req,res){
        let title = req.body.title.split(' ').join('%20')
        let artist = req.body.artist.split(' ').join('%20')
        console.log(title)
        axios({
            method: 'get',
            url: `${api3}/${artist}/${title}`
        })
            .then(({data})=> {
                console.log(data.lyrics)
                Song.create({
                    title: req.body.title, 
                    artist: req.body.artist, 
                    lyrics: data.lyrics
                })
                    .then(song=> {
                        res.status(201).json(song)
                    })
                    .catch(err=> {
                        res.status(400).json({errors: err.errors})
                    })
            })
            .catch(err=> {
                res.status(400).json({errors: err.errors || err.message})
            })
    }

    static findAll(req,res){
        Song.find({})
            .then(songs=> {
                res.status(200).json(songs)
            })
            .catch(err=> {
                res.status(400).json({errors: {songs: {message: err.message}}})
            })
    }

    static show(req,res){
        Song.findOne({
            _id: req.params.id
        })
            .then(song=> {
                res.status(200).json(song)
            })
            .catch(err=> {
                res.status(400).json({errors: {song: {message: err.errors || err.message}}})
            })
    }

    static destroy(req,res){
        Song.findOneAndDelete({
            _id: req.params.id
        })
            .then(deletedSong=> {
                res.status(200).json(deletedSong)
            })
            .catch(err=> {
                res.status(400).json({errors: {delete: {message: err.message}}})
            })
    }
}

module.exports = Controller