var express = require('express');
var router = express.Router();
var userController = require('../controllers/user')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register', userController.register)
router.post('/login', userController.login)

module.exports = router;
