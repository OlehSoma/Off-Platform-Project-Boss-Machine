const express = require('express');
const ideasController = require('../controllers/ideasController');
const checkMillionDollarIdea = require('../checkMillionDollarIdea');
const { checkIfIdeaExist } = require('../../utils/checkItem');
const router = express.Router();

router.route('/').get(ideasController.getAllIdeas);
router.route('/').post(checkMillionDollarIdea, ideasController.crateIdea);
router.route('/:ideaId').get(checkIfIdeaExist, ideasController.getIdeaById);
router
	.route('/:ideaId')
	.put(checkMillionDollarIdea, ideasController.updateIdeaById);
router
	.route('/:ideaId')
	.delete(checkIfIdeaExist, ideasController.deleteIdeaById);

module.exports = router;
