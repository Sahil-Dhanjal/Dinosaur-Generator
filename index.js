// Dotenv module has been used to make environmental variables for sensitive data.
if (process.env.NODE_ENV!=='production'){
  require('dotenv/config')
}

// Importing the express Module
// import express from 'express';
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// fetch being a JS Function, the command 'npm install node-fetch' installs a module for us that allows us to use the fetch function in node as well.
const fetch = require('cross-fetch');

// Using the 'static' folder which contains all our static files that we'd like to be served
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile('/public/index.html')
})

// We've been using the async function because we've been using an API ..
// .. and we don't know like how long it's going to take to take the API Data to the server. 
// By using async, we wait until we receive the data & do something with it. ..
// ..Otherwise, it might try to run everything at the same time which might not work that well.
app.get('/dinoname', async (request, response) => {
    
    // The above fetch function receives a Javascript promise for the request that is given to it ..
    // .. the same has to be converted to JSON Format to make it more readable.

    const fetchAPI = await fetch('https://dinoipsum.com/api/?format=json&words=2&paragraphs=1',{
        "method": "GET"
    });

    const dinoNameResponse = await fetchAPI.json();
    console.log(dinoNameResponse)

    // --- Response.json() --
    // The json() method of the Response Interface takes a response stream and reads it to completion. 
    // It returns a promise which resolves with the result of parsing the body text as JSON.
    // Note that despite the method being named json(), the result is not JSON but is instead ..
    //..the result of taking JSON as input and parsing it to produce a JavaScript object. 
    response.json(dinoNameResponse)

});

// The API_key accessed via its corresponding environment variable (previously created using .env file).
const api_key = process.env.API_KEY;

// GETTING THE IMAGE OF THE DINOSAUR
// Dinoimage is the name of the route in this case.
app.get('/dinoimage', async (request, response) => {

  // We're fetching the Images using a 'Bing Image Search API from 'Rapid API'
    const fetchAPI = await fetch("https://bing-image-search1.p.rapidapi.com/images/search?q=dinosaur&count=50", {
          "method": "GET",
          "headers": {
              "x-rapidapi-host": "bing-image-search1.p.rapidapi.com",
              "x-rapidapi-key": api_key
          }
  });

  const dinoImageResponse = await fetchAPI.json();
  console.log(dinoImageResponse);
  response.json(dinoImageResponse);
})

// Tells the server to listen for any requests that are made by our passed port i.e 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})