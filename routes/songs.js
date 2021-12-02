const router = require('express').Router()
const songController = require('../controllers/song')
const {isLogin} = require('../middlewares/auth')

router.post('/', isLogin, songController.create)
router.get('/', isLogin, songController.findAll)
router.get('/:id', isLogin, songController.show)
router.delete('/:id', isLogin, songController.destroy)

module.exports = router