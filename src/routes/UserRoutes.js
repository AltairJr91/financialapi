const express = require('express');
const{ newUser, login } =require('../controllers/UserController');

const router = express.Router();

router.post('/newuser', newUser)
router.post('/login', login)
module.exports =  router