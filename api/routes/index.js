const express = require('express');

const router = express.Router();

const userRouter = require('./userRoutes');
const dataRouter = require('./dataRouter');

router.use('/users', userRouter);
router.use('/data', dataRouter);

module.exports = router;
