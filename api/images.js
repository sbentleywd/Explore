const express = require('express');
const imagesRouter = express.Router();
const fetch = require('node-fetch');

imagesRouter.param('location', (req, res, next, location) => {
    req.location=location;
    next();
})


imagesRouter.get("/:location", async (req, res) => {
    const unsplashKey = process.env.UNSPLASH_KEY;
    const location = req.location
    const unsplashUrl = 'https://api.unsplash.com/search/photos?';
    const urlToFetch = `${unsplashUrl}?&query=${location}&client_id=${unsplashKey}`
    
    const response = await fetch(urlToFetch)
    if(response.ok) {
        const jsonResponse = await response.json();
        res.json(jsonResponse)
    }
    
});

module.exports = imagesRouter;