const express = require('express');
const flightsRouter = express.Router();
const fetch = require('node-fetch');
const rapidApiHost = 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com';
const rapidApiKey = '185a90480bmsh1625fe9020e6b1dp14f7a4jsn543a826c88bb'


flightsRouter.param('location', async (req, res, next, value) => {
    const locationUrl = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=${value}`;

    const fetchOptions = {
        headers: {
        'x-rapidapi-host': rapidApiHost,
        'x-rapidapi-key': rapidApiKey     
        }
    } 
    const response = await fetch(locationUrl, fetchOptions)
    if(response.ok) {
        const jsonResponse = await response.json();
        req.location = jsonResponse.Places[0].PlaceId
        const today = new Date();
        const date = today.getFullYear()+'-'+('0'+(today.getMonth()+1)).slice(-2)+'-'+('0' + today.getDate()).slice(-2);
        req.date = date;
    }

    next();
})

flightsRouter.param('from', async (req, res, next, value) => {
    const locationUrl = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=${value}`;

    const fetchOptions = {
        headers: {
        'x-rapidapi-host': rapidApiHost,
        'x-rapidapi-key': rapidApiKey     
        }
    } 
    const response = await fetch(locationUrl, fetchOptions)
    if(response.ok) {
        const jsonResponse = await response.json();
        req.from = jsonResponse.Places[0].PlaceId
        
    }

    next();
})


flightsRouter.get("/:location/:from", async (req, res) => {
    const date = req.date
    
    const location = req.location
    const from = req.from
    const flightsUrl = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/GB/GBP/en-UK/${from}/${location}/${date}/${date}`;
    const fetchOptions = {
        headers: {
        'x-rapidapi-host': rapidApiHost,
        'x-rapidapi-key': rapidApiKey     
        }
    }
    const response = await fetch(flightsUrl, fetchOptions)
    if(response.ok) {
        const jsonResponse = await response.json();
        
        res.json(jsonResponse)
    }
    
});

module.exports = flightsRouter;