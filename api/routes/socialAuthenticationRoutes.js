const express = require('express');
const passport = require('passport');

const router = express.Router();

router.route('/google').get(passport.authenticate('google', { scope: ['profile', 'email'] }));

router
  .route('/google/callback')
  .get(passport.authenticate('google', { failureRedirect: 'http://localhost:3000' }), (req, res) => {
    res.redirect('http://localhost:3000');
  });

router.route('/github').get(passport.authenticate('github', { scope: ['profile', 'email'] }));

router
  .route('/github/callback')
  .get(passport.authenticate('github', { failureRedirect: 'http://localhost:3000' }), (req, res) => {
    res.redirect('http://localhost:3000');
  });

router.route('/facebook').get(passport.authenticate('facebook', { scope: ['email'] }));

router
  .route('/facebook/callback')
  .get(passport.authenticate('facebook', { failureRedirect: 'http://localhost:3000' }), (req, res) => {
    res.redirect('http://localhost:3000');
  });

module.exports = router;
