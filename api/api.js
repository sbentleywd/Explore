const express = require('express');
const apiRouter = express.Router();

const weatherRouter = require('./weather.js');
const attractionsRouter = require('./attractions.js');
const restaurantsRouter = require('./restaurants.js');
const flightsRouter = require('./flights.js');

apiRouter.use('/weather', weatherRouter);
apiRouter.use('/attractions', attractionsRouter);
apiRouter.use('/restaurants', restaurantsRouter);
apiRouter.use('/flights', flightsRouter);






module.exports = apiRouter;