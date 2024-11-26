const express = require('express');
const meetingsController = require('../controllers/meetingsController');
const router = express.Router();

router.route('/').get(meetingsController.getAllMeetings);
router.route('/').post(meetingsController.crateMeeting);
router.route('/').delete(meetingsController.deleteAllMeetings);

module.exports = router;
