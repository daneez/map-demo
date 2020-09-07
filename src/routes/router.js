const express = require('express')
const axios = require('axios')

const router = express.Router();

router.get('/api/autocomplete/:query', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const autocompleteUrlPrefix = `https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?apiKey=${process.env.API_KEY}&country=AUS&maxresults=5&query=`;
  
  axios({
    method: 'GET',
    url: autocompleteUrlPrefix + req.params.query,
    headers:{
      "Accept": "application/json",
      "Content-Type": "application/json",
    }
  }).then(response => {
    res.send(JSON.stringify(response.data));
  }).catch(error => {
    res.send(JSON.stringify(error), 400)
  })
})

router.use('/', express.static('client'))

module.exports = router;