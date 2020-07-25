const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const cors = require('cors');
const path=require('path');
require("dotenv").config({path:path.resolve(__dirname, '.env')});
const apiRouter = require('./api')


app.options('*', cors())
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
    // allows Content-Type header to be set - not exposed by default
    exposedHeaders: ['Content-Type']
}));

app.use(errorhandler());
app.use('/api', apiRouter)


if (process.env.NODE_ENV === 'production') {
    const buildPath = path.join(__dirname, 'public');
    app.use(express.static(buildPath));
    // serve the client index.html file for all requests
    app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
    });
    
}

const buildPath = path.join(__dirname, 'public');
app.use(express.static(buildPath));
// serve the client index.html file for all requests
app.get('/', (req, res) => {
res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
 });