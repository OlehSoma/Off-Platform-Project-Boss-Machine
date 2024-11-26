const express = require('express');
const minionsController = require('../controllers/minionsController');
const router = express.Router();

router.route('/').get(minionsController.getAllMinions);
router.route('/').post(minionsController.crateMinion);
router.route('/:minionId').get(minionsController.getMinionById);
router.route('/:minionId').put(minionsController.updateMinionById);
router.route('/:minionId').delete(minionsController.deleteMinionById);

module.exports = router;
