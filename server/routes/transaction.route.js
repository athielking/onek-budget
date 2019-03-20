const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const tranCtrl = require('../controllers/transaction.controller');

const router = express.Router();
module.exports = router;

router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
  .post(asyncHandler(insert))
  .get(asyncHandler(getAll));

router.route('/:id')
  .get(asyncHandler(get))
  .put(asyncHandler(put))
  .patch(asyncHandler(patch))
  .delete(asyncHandler(remove));
  
async function insert(req, res) {
  let user = await tranCtrl.insert(req.user._id, req.body);
  res.json(user);
}

async function getAll(req, res) {
  let users;
  if (req.query.date) {
    users = await tranCtrl.getByDate(req.user._id, req.query.date);
  } else {
    users = await tranCtrl.getAll(req.user._id);
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
  let rem = await tranCtrl.remove(req.params['id']);
  res.json(rem);
}