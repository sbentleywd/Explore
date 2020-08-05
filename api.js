const express = require('express');
const apiRouter = express.Router();

const weatherRouter = require('./weather.js');
const attractionsRouter = require('./attractions.js');
const restaurantsRouter = require('./restaurants.js');

apiRouter.use('/weather', weatherRouter);
apiRouter.use('/attractions', attractionsRouter);
apiRouter.use('/restaurants', restaurantsRouter);






module.exports = apiRouter;