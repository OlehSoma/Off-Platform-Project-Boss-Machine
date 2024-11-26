const {
  getAllFromDatabase,
  addToDatabase,
  deleteAllFromDatabase,
} = require('../db');

const AppError = require('../../utils/appError');

exports.getAllMeetings = (req, res, next) => {
  const meetings = getAllFromDatabase('meetings');

  if (!meetings) {
    return next(new AppError(`Something went wrong`, 500));
  }

  res.send(meetings);
};

exports.deleteAllMeetings = (req, res, next) => {
  const meetings = deleteAllFromDatabase('meetings');

  res.status(204).send(meetings);
};

exports.crateMeeting = (req, res, next) => {
  const meeting = req.body;
  const success = addToDatabase('meetings', meeting);

  if (!success) {
    return next(new AppError(`Something went wrong`, 500));
  }

  res.status(201).send(meeting);
};
