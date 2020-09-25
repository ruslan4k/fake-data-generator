const express = require('express');

const router = express.Router();

const userRouter = require('./userRoutes');

router.use('/users', userRouter);

module.exports = router;
