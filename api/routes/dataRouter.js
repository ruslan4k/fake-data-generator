const express = require('express');
const dataController = require('../controllers/dataController');

const router = express.Router();

router.route('/history')
  .get(dataController.getHistory)
  .post(dataController.addDataGenerationToHistory);

module.exports = router;
