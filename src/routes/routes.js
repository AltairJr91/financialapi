const router = require('express').Router();
const AuthRoutes = require('./AuthRoutes');
const UserRoutes = require('./UserRoutes');

// USER ROUTES

router.use("/auth", AuthRoutes);
router.use("/user", UserRoutes);

module.exports = router