const express = require('express');
const dataController = require('../controllers/dataController');
const requireAuthentication = require('../middlewares/requireAuthentication');

const router = express.Router();

router.route('/history')
  .get(requireAuthentication, dataController.getHistory)
  .post(requireAuthentication, dataController.addDataGenerationToHistory);

module.exports = router;
