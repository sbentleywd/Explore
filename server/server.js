const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const cors = require('cors');
const path=require('path');
require("dotenv").config({path:path.resolve(__dirname, '../.env')});
const fetch = require('node-fetch');

app.options('*', cors())
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
    // allows Content-Type header to be set - not exposed by default
    exposedHeaders: ['Content-Type']
}));

app.use(errorhandler());

if (process.env.NODE_ENV === 'production') {
    const buildPath = path.join(__dirname);
    app.use(express.static(__dirname));
    // serve the client index.html file for all requests
    app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    });
    
}

app.param('location', (req, res, next, location) => {
    req.location=location;
    next();
})


app.get("/weather/:location", async (req, res) => {
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

app.get("/attractions/:location", async (req, res) => {
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


    // res.send("Getting attractions")
});





app.listen(port, () => {
    
    console.log(`Server is up on port ${port}!`);
 });