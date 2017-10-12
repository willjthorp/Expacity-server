const express = require('express');
const router = express.Router();

const https = require('https');


// Get all cities
router.get('/cities', (req, res, next) => {
  https.get(`https://www.numbeo.com/api/cities?api_key=ghhbagkcagbicb`, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      res.json(JSON.parse(data));
    });
  }).on("error", (err) => {
    res.json("Error: " + err.message);
  });
});

// Get indices information for city
router.get('/indices/:city', (req, res, next) => {
  https.get(`https://www.numbeo.com/api/indices?api_key=ghhbagkcagbicb&query=${req.params.city}`, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      res.json(JSON.parse(data));
    });
  }).on("error", (err) => {
    res.json("Error: " + err.message);
  });
});


// Get google photo reference for city
router.get('/photoreference/:city', (req, res, next) => {
  https.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.params.city}&key=AIzaSyCRBJhxq4B8uCjH3NTkCWO34M6UVQO-Sfg`, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      res.json(JSON.parse(data));
    });
  }).on("error", (err) => {
    res.json("Error: " + err.message);
  });
});


// Use photo reference to retrieve city photo
router.get('/photo/:photo', (req, res, next) => {
  https.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=2000&photoreference=${req.params.photo}&key=AIzaSyCRBJhxq4B8uCjH3NTkCWO34M6UVQO-Sfg`, (resp) => {
    console.log('resp:', resp.headers.location);
    res.json({
      location: resp.headers.location
    });
  }).on("error", (err) => {
    res.json("Error: " + err.message);
  });
});


// Get city prices information
router.get('/prices/:city', (req, res, next) => {
  https.get(`https://www.numbeo.com/api/city_prices?api_key=ghhbagkcagbicb&query=${req.params.city}`, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      res.json(JSON.parse(data));
    });
  }).on("error", (err) => {
    res.json("Error: " + err.message);
  });
});


// Get city climate information
router.get('/city_climate/:city', (req, res, next) => {
  https.get(`https://www.numbeo.com/api/city_climate?api_key=ghhbagkcagbicb&query=${req.params.city}`, (resp) => {
    let data = '';
    resp.on('data', (chunk) => {
      data += chunk;
    });
    resp.on('end', () => {
      res.json(JSON.parse(data));
    });
  }).on("error", (err) => {
    res.json("Error: " + err.message);
  });
});




module.exports = router;
