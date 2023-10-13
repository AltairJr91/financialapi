const express = require('express');
const { newUser, getUsers } = require('../controllers/UserController');
const { login } = require('../controllers/AuthController')
const { authenticate } = require('../middlewares/AuthMiddleware')
const router = express.Router();

router.post('/newuser', newUser)
router.post('/login', login)
router.get('/users', authenticate, getUsers)


module.exports = router