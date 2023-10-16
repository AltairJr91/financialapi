const express = require('express');
const {  getUsers } = require('../controllers/UserController');
const { authenticate } = require('../middlewares/AuthMiddleware')
const router = express.Router();

router.get('/users', authenticate, getUsers)


module.exports = router