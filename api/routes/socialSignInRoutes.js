const express = require('express');
const passport = require('passport');
const { APP_URL } = require('../constants/envVariables');

const SOCIAL_SIGN_IN_FAILURE_REDIRECT_LINK = `${APP_URL}/signin`;

const router = express.Router();

router.route('/google').get(passport.authenticate('google', { scope: ['profile', 'email'] }));

router
  .route('/google/callback')
  .get(passport.authenticate('google', { failureRedirect: SOCIAL_SIGN_IN_FAILURE_REDIRECT_LINK }), (req, res) => {
    res.redirect(APP_URL);
  });

router.route('/github').get(passport.authenticate('github', { scope: ['profile', 'email'] }));

router
  .route('/github/callback')
  .get(passport.authenticate('github', { failureRedirect: SOCIAL_SIGN_IN_FAILURE_REDIRECT_LINK }), (req, res) => {
    res.redirect(APP_URL);
  });

router.route('/facebook').get(passport.authenticate('facebook', { scope: ['email'] }));

router
  .route('/facebook/callback')
  .get(passport.authenticate('facebook', { failureRedirect: SOCIAL_SIGN_IN_FAILURE_REDIRECT_LINK }), (req, res) => {
    res.redirect(APP_URL);
  });

module.exports = router;
