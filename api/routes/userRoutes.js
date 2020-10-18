const express = require('express');
const { body } = require('express-validator');
const passport = require('passport');
const userController = require('../controllers/userController');
const validationMiddleware = require('../middlewares/validationMiddleware');

const router = express.Router();

router
  .route('/')
  .post(
    [
      body('name').not().isEmpty().withMessage('Name must be provided'),
      body('email').not().isEmpty().isEmail().withMessage('Email must be provided'),
      body('password').not().isEmpty().withMessage('Password must be provided'),
    ],
    validationMiddleware,
    userController.createUser
  );

router
  .route('/login')
  .post(
    [
      body('username').not().isEmpty().isEmail().withMessage('Not valid email'),
      body('password').not().isEmpty().withMessage('Password must be provided'),
    ],
    validationMiddleware,
    passport.authenticate('local'),
    userController.getUserByEmailAndPassword
  );

router.route('/logout').get(userController.logout);

router.route('/me').get(userController.getCurrentUser);

module.exports = router;
