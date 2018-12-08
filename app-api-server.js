const axios = require('axios');
const express = require('express');
const cors = require('cors')

const port = process.env.PORT || 3000;

var app = express();
app.use(cors())

app.get('/', (req,res) => {
  console.log(req.query)
  var encode_address = encodeURIComponent(req.query.address)
  var geocodeUrl = 'http://www.mapquestapi.com/geocoding/v1/address?key=uYj79DApCUiljtG2BU27Pnq6qmM0lzAo&location='+encode_address

  axios.get(geocodeUrl).then( (response) => {
    if(response.data.results[0].locations[0].geocodeQualityCode.includes('P1CXX')){
      throw new Error('Unable to find that address.')
    }
    console.log(response.data.results[0].providedLocation.location)
    var lat = response.data.results[0].locations[0].displayLatLng.lat
    var lng = response.data.results[0].locations[0].displayLatLng.lng
    var weatherUrl = `https://api.darksky.net/forecast/813cd1480f8241637713ed34457e66a0/${lat},${lng}`
    return axios.get(weatherUrl);
  }).then( (response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature
    var message = `The temperature is ${temperature} but it feels like ${apparentTemperature}`
    res.json({message:message})
  }).catch((e) => {
    if(e.code === "ENOTFOUND"){
      message = "unable to connect to api"
      res.json({message:message})
    }else{
      message = e.message
      res.json({message:message})
    }
  });
});

app.listen(port, () => {
  console.log("server is up and running in port "+port)
});
