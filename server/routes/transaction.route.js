const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const tranCtrl = require('../controllers/transaction.controller');

const router = express.Router();
module.exports = router;

//router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
  .post(asyncHandler(insert))
  .get(asyncHandler(getAll));

router.route('/agg/:type')
  .get(asyncHandler(getAggregate));

router.route('/:id')
  .get(asyncHandler(get))
  .put(asyncHandler(put))
  .patch(asyncHandler(patch))
  .delete(asyncHandler(remove));
  


async function insert(req, res) {
  let user = await tranCtrl.insert(req.body);
  res.json(user);
}

async function getAll(req, res) {
  let users;
  if (req.query.date) {
    users = await tranCtrl.getByDate(req.query.date);
  } else {
    users = await tranCtrl.getAll();
  }

  res.json(users);
}

async function get(req, res) {
  let tran = await tranCtrl.get(req.params['id'])
  res.json(tran);
}

async function put(req, res) {
  let tran = await tranCtrl.put(req.params['id'], req.body);
  res.json(tran);
}

async function patch(req, res) {
  let tran = await tranCtrl.patch(req.params['id'], req.body);
  res.json(tran);
}

async function remove(req, res) {
  await tranCtrl.remove(req.params['id']);
}

async function getAggregate(req, res) {
  let aggregate;
  let aggType = req.params['type'];
  console.log(req.params);

  switch(aggType) {
    case 'Type':
      aggregate = await tranCtrl.getAggregateOfType(req.query.date)
      break;
    case 'Category':
      aggregate = await tranCtrl.getAggregateOfCategory(req.query.date)
      break;
  }
  
  return res.json(aggregate);
}
