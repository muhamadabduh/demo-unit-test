const mongoose = require('mongoose')
const bcrypt = require('../helpers/bcryptHelper')

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            isAsync: true,
            validator: function(v, cb){
                User.findOne({
                    email: v
                }, (err, result)=> {
                    if(err) console.log(err)
                    var msg = `Duplicate email`
                    cb(!result, msg)
                })
            },
            message: 'Duplicate email'
        }
    }, 
    password: {
        type: String,
        required: [true, 'Password is required']
    }
})

userSchema.pre('save', function(next){
    this.password = bcrypt.encode(this.password)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
