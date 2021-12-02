const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

class Helper {
    static encode(password) {
        return bcrypt.hashSync(password, salt)
    }

    static match(password, hash) {
        return bcrypt.compareSync(password, hash)
    }
}

module.exports = Helper