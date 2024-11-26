const {
	getAllFromDatabase,
	addToDatabase,
	getFromDatabaseById,
	deleteFromDatabasebyId,
	updateInstanceInDatabase,
} = require('../db');

const AppError = require('../../../utils/appError');

exports.getAllIdeas = (req, res, next) => {
	const ideas = getAllFromDatabase('ideas');

	if (!ideas) {
		return next(new AppError(`Something went wrong`, 500));
	}

	res.send(ideas);
};

exports.getIdeaById = (req, res, next) => {
	const { ideaId } = req.params;
	const idea = getFromDatabaseById('ideas', ideaId);

	if (!idea) {
		return next(new AppError(`Idea with id ${ideaId} not found`, 404));
	}

	res.send(idea);
};

exports.updateIdeaById = (req, res, next) => {
	const idea = req.idea;

	const updatedIdea = { ...idea, ...req.body };

	const success = updateInstanceInDatabase('ideas', updatedIdea);

	if (!success) {
		return next(new AppError(`Something went wrong`, 500));
	}

	res.status(201).send(updatedIdea);
};

exports.deleteIdeaById = (req, res, next) => {
	const { ideaId } = req.params;
	const idea = getFromDatabaseById('ideas', ideaId);

	if (!idea) {
		return next(new AppError(`Idea with id ${ideaId} not found`, 404));
	}

	deleteFromDatabasebyId('ideas', ideaId);
	res.status(204).send();
};

exports.crateIdea = (req, res, next) => {
	const idea = req.body;
	const success = addToDatabase('ideas', idea);

	if (!success) {
		return next(new AppError(`Something went wrong`, 500));
	}

	res.status(201).send(idea);
};
