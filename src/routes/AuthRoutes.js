const express = require('express');
const { newUser } = require('../controllers/UserController');
const { login } = require('../controllers/AuthController')

const router = express.Router();

router.post('/newuser', newUser);
router.post('/login', login);

module.exports = router
