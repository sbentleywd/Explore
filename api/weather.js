const express = require('express');
const weatherRouter = express.Router();
const fetch = require('node-fetch');

weatherRouter.param('location', (req, res, next, location) => {
    // adds location to request
    req.location=location;
    next();
})


weatherRouter.get("/:location", async (req, res) => {
    // queries open weather api for current weather information at destination
    const openWeatherKey = process.env.OPENWEATHER_KEY;
    const location = req.location
    const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const urlToFetch = `${weatherUrl}?&q=${location}&APPID=${openWeatherKey}`
    
    const response = await fetch(urlToFetch)
    if(response.ok) {
        const jsonResponse = await response.json();
        res.json(jsonResponse)
    }
    
});

module.exports = weatherRouter;