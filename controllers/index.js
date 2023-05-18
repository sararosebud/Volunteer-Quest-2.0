const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const profileRoutes = require('./profileRoutes');
const eventRoutes = require('./eventRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/profile', profileRoutes);
router.use('/event', eventRoutes)

module.exports = router;