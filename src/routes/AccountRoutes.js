const express = require('express');
const { authenticate } = require('../middlewares/AuthMiddleware');
const { createAccount, accountUpdate, accountListFromUser,userAccounts } = require('../controllers/AccountController');


const router = express.Router();

router.post('/createaccount', authenticate ,createAccount);
router.patch('/accountpatch', authenticate ,accountUpdate);
router.get('/useraccounts', authenticate, userAccounts);
router.get('/accountslist', authenticate, accountListFromUser);

module.exports = router