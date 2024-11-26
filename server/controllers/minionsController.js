const {
	getAllFromDatabase,
	addToDatabase,
	getFromDatabaseById,
	deleteFromDatabasebyId,
	updateInstanceInDatabase,
} = require('../db');

const AppError = require('../../utils/appError');

exports.getAllMinions = (req, res, next) => {
	const minions = getAllFromDatabase('minions');

	if (!minions) {
		return next(new AppError(`Something went wrong`, 500));
	}

	res.send(minions);
};

exports.getMinionById = (req, res, next) => {
	const { minionId } = req.params;
	const minion = getFromDatabaseById('minions', minionId);

	if (!minion) {
		return next(new AppError(`Minion with id ${minionId} not found`, 404));
	}

	res.send(minion);
};

exports.updateMinionById = (req, res, next) => {
	const { minionId } = req.params;
	const minion = getFromDatabaseById('minions', minionId);

	if (!minion) {
		return next(new AppError(`Minion with id ${minionId} not found`, 404));
	}

	const updatedMinion = { ...minion, ...req.body };

	const success = updateInstanceInDatabase('minions', updatedMinion);

	if (!success) {
		return next(new AppError(`Something went wrong`, 500));
	}

	res.status(201).send(updatedMinion);
};

exports.deleteMinionById = (req, res, next) => {
	const { minionId } = req.params;
	const minion = getFromDatabaseById('minions', minionId);

	if (!minion) {
		return next(new AppError(`Minion with id ${minionId} not found`, 404));
	}

	deleteFromDatabasebyId('minions', minionId);
	res.status(204).send();
};

exports.crateMinion = (req, res, next) => {
	const minion = req.body;
	const success = addToDatabase('minions', minion);

	if (!success) {
		return next(new AppError(`Something went wrong`, 500));
	}

	res.status(201).send(minion);
};
