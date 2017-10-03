var express = require('express');
var router = express.Router();
var parseString = require('xml2js').parseString;

const https = require('https');
const http = require('http');



router.get('/indices/:city', (req, res, next) => {
  https.get(`https://www.numbeo.com/api/indices?api_key=ghhbagkcagbicb&query=` + req.params.city, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      res.json(JSON.parse(data));
    });

  }).on("error", (err) => {
    res.json("Error: " + err.message);
  });
});



router.get('/photoreference/:city', (req, res, next) => {
  https.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${req.params.city}&key=AIzaSyCRBJhxq4B8uCjH3NTkCWO34M6UVQO-Sfg`, (resp) => {
    let data = '';
    let jsonData;

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      res.json(JSON.parse(data));
    });

  }).on("error", (err) => {
    res.json("Error: " + err.message);
  });
});


router.get('/photo/:photo', (req, res, next) => {
  https.get(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=2000&photoreference=${req.params.photo}&key=AIzaSyCRBJhxq4B8uCjH3NTkCWO34M6UVQO-Sfg`, (resp) => {
    console.log('resp:', resp.headers.location);
    res.json({location: resp.headers.location});
  }).on("error", (err) => {
    res.json("Error: " + err.message);
  });
});


module.exports = router;
