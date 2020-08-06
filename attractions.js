const express = require('express');
const attractionsRouter = express.Router();
const fetch = require('node-fetch');

attractionsRouter.param('location', (req, res, next, location) => {
    req.location=location;
    next();
})

attractionsRouter.get("/:location", async (req, res) => {
    
    const attractionsUrl = 'https://api.foursquare.com/v2/venues/explore?near=';
    const clientId = process.env.FOURSQUARE_CLIENT_ID
    const clientSecret = process.env.FOURSQUARE_CLIENT_SECRET
    const location = req.location
    const urlToFetch = `${attractionsUrl}${location}&limit=50&client_id=${clientId}&client_secret=${clientSecret}&v=20200409&sortByPopularity=1`
    
    const response = await fetch(urlToFetch)
    if(response.ok) {
        const jsonResponse = await response.json();
        res.json(jsonResponse)
    }

});

module.exports = attractionsRouter;