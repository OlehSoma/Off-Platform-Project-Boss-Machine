const AppError = require('../utils/appError');
const { getFromDatabaseById } = require('../server/db');
const checkMillionDollarIdea = (req, res, next) => {
	let weeklyRevenue = 0;
	let numWeeks = 0;

	if (req.method === 'PUT') {
		const { ideaId } = req.params;
		const idea = getFromDatabaseById('ideas', ideaId);

		if (!idea) {
			return next(new AppError(`Idea with id ${ideaId} not found`, 404));
		}

		weeklyRevenue = idea.weeklyRevenue;
		numWeeks = idea.numWeeks;

		req.idea = idea;
	}

	const { weeklyRevenue: newWeeklyRevenue, numWeeks: newNumWeeks } = req.body;

	if (newWeeklyRevenue) {
		if (isNaN(Number(newWeeklyRevenue)) || Number(newWeeklyRevenue) < 0) {
			return next(new AppError(`Invalid weeklyRevenue value`, 400));
		}
		weeklyRevenue = Number(newWeeklyRevenue);
	}

	if (newNumWeeks) {
		if (isNaN(Number(newNumWeeks)) || Number(newNumWeeks) < 0) {
			return next(new AppError(`Invalid numWeeks value`, 400));
		}
		numWeeks = Number(newNumWeeks);
	}

	const goalSum = 1000000;
	const ideaValue = weeklyRevenue * numWeeks;
	const isMillionDollarIdea = ideaValue >= goalSum;

	if (!isMillionDollarIdea) {
		return next(new AppError(`Idea value is less than ${goalSum}`, 400));
	}

	next();
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
