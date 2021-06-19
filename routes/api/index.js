const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughRoutes = require('./thought-routes');

// add prefix of 1users to routes created in user-routes.js
router.use('/users', userRoutes);
router.use('/thoughts', thoughRoutes);
module.exports = router;