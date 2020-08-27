const express = require('express');
const apiRouter = express.Router();

const weatherRouter = require('./weather.js');
const attractionsRouter = require('./attractions.js');
const restaurantsRouter = require('./restaurants.js');
const flightsRouter = require('./flights.js');
const imagesRouter = require('./images.js');

apiRouter.use('/weather', weatherRouter);
apiRouter.use('/attractions', attractionsRouter);
apiRouter.use('/restaurants', restaurantsRouter);
apiRouter.use('/flights', flightsRouter);
apiRouter.use('/images', imagesRouter);






module.exports = apiRouter;