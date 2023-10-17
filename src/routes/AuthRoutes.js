const express = require('express');
const { newUser } = require('../controllers/UserController');
const { login } = require('../controllers/AuthController');
const { authenticate } = require('../middlewares/AuthMiddleware');

const router = express.Router();

router.post('/newuser', newUser);
router.post('/login',authenticate ,login);

module.exports = router
