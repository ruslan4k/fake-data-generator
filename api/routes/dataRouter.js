const express = require('express');
const dataController = require('../controllers/dataController');
const authenticate = require('../middlewares/authenticate');

const router = express.Router();

router.route('/history')
  .get(authenticate, dataController.getHistory)
  .post(authenticate, dataController.addDataGenerationToHistory);

module.exports = router;
