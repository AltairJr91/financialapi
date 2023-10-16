const router = require('express').Router();
const AuthRoutes = require('./AuthRoutes');
const UserRoutes = require('./UserRoutes');
const AccountRoutes = require('./AccountRoutes');
const { authenticate } = require('../middlewares/AuthMiddleware');

// USER ROUTES

router.use("/auth", AuthRoutes);
router.use("/user", authenticate, UserRoutes);
router.use("/sec", authenticate, AccountRoutes);
module.exports = router