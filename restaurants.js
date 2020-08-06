const express = require('express');
const restaurantsRouter = express.Router();
const fetch = require('node-fetch');

restaurantsRouter.param('location', async (req, res, next, location) => {
    
    req.location = location;
    next();
})

restaurantsRouter.get("/:location", async (req, res) => {
    const location = req.location
    const apiKey = process.env.YELP_KEY    
    const fetchOptions = {
        headers: {
        'Authorization': `Bearer ${apiKey}`        
        }
    }
    const restaurantsUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${location}&sort_by=rating`;
    const response = await fetch(restaurantsUrl, fetchOptions)
    if(response.ok) {
        const jsonResponse = await response.json();
        res.json(jsonResponse)
    }

});

module.exports = restaurantsRouter;