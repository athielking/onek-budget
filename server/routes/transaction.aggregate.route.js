const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const tranCtrl = require('../controllers/transaction.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.route('/type')
  .get(asyncHandler(getTypeAggregate));

router.route('/category')
  .get(asyncHandler(getCategoryAggregate));

router.route('/subcategory')
  .get(asyncHandler(getSubcategoryAggregate));

  router.route('/categoryByType')
  .get(asyncHandler(getCategoryAggregateByType));

router.route('/subcategoryByType')
  .get(asyncHandler(getSubcategoryAggregateByType));

async function getSubcategoryAggregate(req, res) {
  let aggregate = await tranCtrl.aggregateSubcategory(req.query.date)
      
  return res.json(aggregate);
}

async function getCategoryAggregate(req, res) {
  let aggregate = await tranCtrl.aggregateCategory(req.user._id, req.query.date)
      
  return res.json(aggregate);
}

async function getTypeAggregate(req, res) {
  let aggregate = await tranCtrl.aggregateType(req.user._id, req.query.date)
      
  return res.json(aggregate);
}

async function getSubcategoryAggregateByType(req, res) {
  let aggregate = await tranCtrl.aggregateSubcategoryByType(req.user._id, req.query.date)
      
  return res.json(aggregate);
}

async function getCategoryAggregateByType(req, res) {
  let aggregate = await tranCtrl.aggregateCategoryByType(req.user._id, req.query.date)
      
  return res.json(aggregate);
}
