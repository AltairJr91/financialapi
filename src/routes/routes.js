const router = require('express').Router();

// USER ROUTES
const UserRoutes = require('./UserRoutes')
router.use("/auth", UserRoutes)

module.exports = router