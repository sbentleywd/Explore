const express = require('express');
const weatherRouter = express.Router();
const fetch = require('node-fetch');

weatherRouter.param('location', (req, res, next, location) => {
    console.log('location set')
    console.log(location)
    req.location=location;
    next();
})


weatherRouter.get("/:location", async (req, res) => {
    console.log('getting weather')
    const openWeatherKey = process.env.OPENWEATHER_KEY;
    const location = req.location
    console.log(location)
    const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const urlToFetch = `${weatherUrl}?&q=${location}&APPID=${openWeatherKey}`
    
    const response = await fetch(urlToFetch)
    if(response.ok) {
        const jsonResponse = await response.json();
        res.json(jsonResponse)
    }
    
});

module.exports = weatherRouter;