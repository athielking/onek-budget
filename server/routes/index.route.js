const express = require('express');
const userRoutes = require('./user.route');
const authRoutes = require('./auth.route');
const transRoutes = require('./transaction.route');
const templateRoutes = require('./template.route');
const tranAggRoutes = require('./transaction.aggregate.route');
const tempAggRoutes = require('./template.aggregate.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/trans', transRoutes);
router.use('/temp', templateRoutes);
router.use('/agg/tran', tranAggRoutes);
router.use('/agg/temp', tempAggRoutes);

module.exports = router;