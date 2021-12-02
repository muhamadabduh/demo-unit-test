const jwt = require('jsonwebtoken')
const secret = process.env.SECRET

class Helper{
    static encode(data){
        return jwt.sign(data, secret)
    }

    static decode(token){
        return jwt.verify(token, secret)
    }
}

module.exports = Helper