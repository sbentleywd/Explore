const express = require('express');
const apiRouter = express.Router();
const fetch = require('node-fetch');


apiRouter.param('location', (req, res, next, location) => {
    req.location=location;
    next();
})


apiRouter.get("api/weather/:location", async (req, res) => {
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

apiRouter.get("api/attractions/:location", async (req, res) => {
    const attractionsUrl = 'https://api.foursquare.com/v2/venues/explore?near=';
    const clientId = process.env.FOURSQUARE_CLIENT_ID
    const clientSecret = process.env.FOURSQUARE_CLIENT_SECRET
    const location = req.location
    const urlToFetch = `${attractionsUrl}${location}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20200409`
    
    const response = await fetch(urlToFetch)
    if(response.ok) {
        const jsonResponse = await response.json();
        res.json(jsonResponse)
    }

});

module.exports = apiRouter;