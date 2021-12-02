const User = require('../models/User')
const bcrypt = require('../helpers/bcryptHelper')
const jwt = require('../helpers/jwtHelper')
class Controller {
    static register(req,res){
        User.create({
            email: req.body.email,
            password: req.body.password
        })
            .then(user=> {
                res.status(201).json(user)
            })
            .catch(err=> {
                console
                res.status(400).json({errors: err.errors})
            })
    }

    static login(req,res){
        User.findOne({
            email: req.body.email
        })
            .then(user=> {
                if(bcrypt.match(req.body.password, user.password)){
                    let data = {
                        _id: user._id,
                        email: user.email
                    }
                    let accessToken = jwt.encode(data)
                    res.status(200).json({accessToken: accessToken})
                } else {
                    res.status(400).json({errors: {login: {message: 'Invalid email/password'}}})
                }
            })
            .catch(err=> {
                console.log(err)
                res.status(400).json({errors: {login: {message: 'Invalid email/password'}}})
            })
    }
}

module.exports = Controller