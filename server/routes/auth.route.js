const express = require('express');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');
const config = require('../config/config');

const router = express.Router();
module.exports = router;

router.post('/register', asyncHandler(register), login);
router.post('/login', passport.authenticate('local', { session: false }), login);
router.post('/logout', logout);
router.get('/me', passport.authenticate('jwt', { session: false }), login);

async function register(req, res, next) {
  let user = await userCtrl.insert(req.body);
  user = user.toObject();
  delete user.hashedPassword;
  req.user = user;
  next()
}

function login(req, res) {
  let user = req.user;
  let token = authCtrl.generateToken(user);
  const opts = {
    httpOnly: true,
    expires: 0
  };

  res.cookie('jwt', token, opts);
  res.json(user);
}

function logout(req, res) {
  res.clearCookie('jwt');
  res.status(204).end();
}
