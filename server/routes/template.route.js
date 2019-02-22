const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const tempCtrl = require('../controllers/template.controller');

const router = express.Router();
module.exports = router;

//router.use(passport.authenticate('jwt', { session: false }))

router.route('/')
  .post(asyncHandler(insert))
  .get(asyncHandler(getAll));

router.route('/:id')
  .get(asyncHandler(get))
  .put(asyncHandler(put))
  .patch(asyncHandler(patch))
  .delete(asyncHandler(remove));
  


async function insert(req, res) {
  let template = await tempCtrl.insert(req.body);
  res.json(template);
}

async function getAll(req, res) {
  let templates;
  templates = await tempCtrl.getAll();

  res.json(templates);
}

async function get(req, res) {
  let template = await tempCtrl.get(req.params['id'])
  res.json(template);
}

async function put(req, res) {
  let template = await tempCtrl.put(req.params['id'], req.body);
  res.json(template);
}

async function patch(req, res) {
  let template = await tempCtrl.patch(req.params['id'], req.body);
  res.json(template);
}

async function remove(req, res) {
  await tempCtrl.remove(req.params['id']);
}
