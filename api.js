const express = require('express');
const apiRouter = express.Router();

const weatherRouter = require('./weather.js');
const attractionsRouter = require('./attractions.js');

apiRouter.use('/weather', weatherRouter);
apiRouter.use('/attractions', attractionsRouter);






module.exports = apiRouter;