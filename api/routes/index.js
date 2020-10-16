const express = require('express');

const router = express.Router();

const userRouter = require('./userRoutes');
const dataRouter = require('./dataRouter');
const socialAuthRouter = require('./socialAuthenticationRoutes');

router.use('/users', userRouter);
router.use('/data', dataRouter);
router.use('/auth/social', socialAuthRouter);

module.exports = router;
