const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Addres to fetch weather',
      string: true
    }
  })
  .help()
  .alias('help','h')
  .argv;

var encode_address = encodeURIComponent(argv.a)
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
  console.log(`The temperature is ${temperature} but it feels like ${apparentTemperature}`)

}).catch((e) => {
  if(e.code === "ENOTFOUND"){
    console.log("unable to connect to api")
  }else{
    console.log(e.message)
  }
});
