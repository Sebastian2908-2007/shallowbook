const router = require('express').Router();

const apiRoutes = require('./api');

// add prefix api to all routes imported from api directory
router.use('/api', apiRoutes);

module.exports = router;