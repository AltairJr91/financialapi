const express = require('express');
const { getUsers, updateUser, deleteUser } = require('../controllers/UserController');

const router = express.Router();

router.get('/users', getUsers);
router.put('/updateuser', updateUser);
router.delete('/deleteuser', deleteUser);
module.exports = router