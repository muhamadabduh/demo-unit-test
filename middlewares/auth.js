const jwt = require('../helpers/jwtHelper')
const User = require('../models/User')

class Middlewares {
    static isLogin(req,res,next){
        console.log(req.headers.token)
        if(req.headers.token){
            let decoded = jwt.decode(req.headers.token)
            User.findOne({
                email: decoded.email
            })
                .then(user=> {
                    if(user){
                        req.currentUser = decoded
                        next()
                    } else {
                        res.status(400).json({errors: {token: {message: 'Invalid access token'}}})
                    }
                })
                .catch(err=> {
                    res.status(400).json({errors: {token: {message: 'Invalid access token'}}})
                })
        } else {
            res.status(400).json({errors: {token: {message: 'Please provide your access token'}}})
        }
    }

}

module.exports = {
    isLogin: Middlewares.isLogin
}