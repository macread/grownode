//set server parts first, then test to make sure it works.

//require what we need
require('dotenv').config();

const express = require('express') 
    , bodyParser = require('body-parser')
    , controller = require('./controller');

//deconstruct the data from the .env file
const {
    SERVER_PORT,
} = process.env;

const app = express(); //server

app.use(bodyParser.json());

app.get('/api/people/:id', controller.getPeople);
app.get('/api/planets/', controller.getPlanets);

//server
//get that server going 
app.listen(SERVER_PORT, () => {
    console.log('Listening on port ', SERVER_PORT);
})