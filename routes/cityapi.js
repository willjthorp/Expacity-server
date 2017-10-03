var express = require('express');
var router = express.Router();

const https = require('https');

router.get('/indices/:city', (req, res, next) => {
  console.log('hello');
  https.get(`https://www.numbeo.com/api/indices?api_key=ghhbagkcagbicb&query=` + req.params.city, (resp) => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(data);
      res.json(JSON.parse(data));
    });

  }).on("error", (err) => {
    res.json("Error: " + err.message);
  });
});

module.exports = router;
