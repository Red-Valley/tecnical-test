const router = require('express').Router();
//const multipart = require('connect-multiparty');
//controllers
const Login = require('../controllers/login.controller');
const Users = require('../controllers/user.controller');

//Login
router.post('/login', Login);

//users
router.post('/users',Users.create)


module.exports = router;