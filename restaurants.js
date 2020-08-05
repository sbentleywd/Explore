const express = require('express');
const restaurantsRouter = express.Router();
const fetch = require('node-fetch');

restaurantsRouter.param('location', async (req, res, next, location) => {
    
    const userKey = process.env.ZOMATO_KEY    
    const locationsUrl = `https://developers.zomato.com/api/v2.1/locations?query=${location}`
    
    const fetchOptions = {
        headers: {
        'user-key': `${userKey}`,
        'Accept': 'application/json'
        }
    }
    
    const response = await fetch(locationsUrl, fetchOptions)
    if(response.ok) {
        const jsonResponse = await response.json();
        console.log(jsonResponse.location_suggestions)
        req.locationId = jsonResponse.location_suggestions[0].city_id        
    }
    next();
})

restaurantsRouter.get("/:location", async (req, res) => {
    const locationId = req.locationId
    const userKey = process.env.ZOMATO_KEY    
    const fetchOptions = {
        headers: {
        'user-key': `${userKey}`,
        'Accept': 'application/json'
        }
    }
    const restaurantsUrl = `https://developers.zomato.com/api/v2.1/search?entity_id=${locationId}&entity_type=city&count=10&sort=rating`;
    const response = await fetch(restaurantsUrl, fetchOptions)
    if(response.ok) {
        const jsonResponse = await response.json();
        res.json(jsonResponse)
    }

});

module.exports = restaurantsRouter;