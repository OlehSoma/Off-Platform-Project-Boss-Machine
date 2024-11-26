const AppError = require('./appError');
const { getFromDatabaseById } = require('../server/db');

const checkItemExist = (model, key, item) => (req, res, next) => {
  const foundItem = getFromDatabaseById(model, req.params[key]);

  if (!foundItem) {
    return next(
      new AppError(
        `${
          item.charAt(0).toUpperCase() + item.slice(1)
        } with id ${key} not found`,
        404
      )
    );
  }

  req[item] = foundItem;

  next();
};

exports.checkIfIdeaExist = checkItemExist('ideas', 'ideaId', 'idea');
exports.checkIfMinionExist = checkItemExist('minions', 'minionId', 'minion');
