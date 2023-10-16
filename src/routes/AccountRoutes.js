const express = require('express');
const { authenticate } = require('../middlewares/AuthMiddleware');
const { createAccount, accountUpdate, accountTotal } = require('../controllers/AccountController');


const router = express.Router();

router.post('/createaccount', authenticate ,createAccount);
router.post('/accountPatch', authenticate ,accountUpdate);
router.get('/accounttotal', authenticate, accountTotal);

module.exports = router