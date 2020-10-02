const express = require('express');
const flightsRouter = express.Router();
const fetch = require('node-fetch');
// rapid api details
const rapidApiHost = 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com';
const rapidApiKey = '185a90480bmsh1625fe9020e6b1dp14f7a4jsn543a826c88bb'


flightsRouter.param('location', async (req, res, next, value) => {
    // takes destination city param and searches skyscanner location endpoint for airport code which is then added to request
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
        // first item in response from location search added to rec.location
        req.location = jsonResponse.Places[0].PlaceId

        // creates outbound (today) & return dates (today + 4)

        const today = new Date();
        let returnDate = new Date();
        returnDate.setDate(today.getDate() + 4);
        // formats dates to string and adds to request
        const outboundDateString = today.getFullYear()+'-'+('0'+(today.getMonth()+1)).slice(-2)+'-'+('0' + today.getDate()).slice(-2);
        req.outboundDate = outboundDateString;
        const inboundDateString = returnDate.getFullYear()+'-'+('0'+(returnDate.getMonth()+1)).slice(-2)+'-'+('0' + returnDate.getDate()).slice(-2);
        req.inboundDate = inboundDateString;
    }

    next();
})

flightsRouter.param('from', async (req, res, next, value) => {
    // takes 'from' city param and searches skyscanner location endpoint for airport code which is then added to request
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
    // uses skyscanner flight search endpoint to search for flights using location codes & dates added to request by param rules
    const outboundDate = req.outboundDate
    const inboundDate = req.inboundDate
    const location = req.location
    const from = req.from;
    const flightsUrl = `https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/GB/GBP/en-UK/${from}/${location}/${outboundDate}/${inboundDate}`;
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