const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const minionsRoute = require('./server/routs/minionsRoute');
const meetingsRoute = require('./server/routs/meetingsRoute');
const ideasRoute = require('./server/routs/ideasRoute');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./server/controllers/errorController');
module.exports = app;

/* Do not change the following line! It is required for testing and allowing
 *  the frontend application to interact as planned with the api server
 */
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html
app.use(cors());

// Add middware for parsing request bodies here:
app.use(bodyParser.json());

// Mount your existing apiRouter below at the '/api' path.
app.use('/api/minions', minionsRoute);
app.use('/api/meetings', meetingsRoute);
app.use('/api/ideas', ideasRoute);

app.all('*', (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

// This conditional is here for testing purposes:
if (!module.parent) {
	// Add your code to start the server listening at PORT below:
	app.listen(PORT, () => {
		console.log(`App running on ${PORT}`);
	});
}
