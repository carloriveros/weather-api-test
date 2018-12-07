const request = require('request');

var geocodeAddress = (address, callback) => {

  encode_address = encodeURIComponent(address)
  request({
    url:'http://www.mapquestapi.com/geocoding/v1/address?key=uYj79DApCUiljtG2BU27Pnq6qmM0lzAo&location='+encode_address,
    json:true
  }, (error,response,body) => {
    if(error){
      callback('unable to connect to server')
    } else if (body.results[0].locations[0].geocodeQualityCode.includes('P1CXX')) {
      callback('address not found')
    }else{
      //console.log(JSON.stringify(body, undefined, 2)); //prettify
      callback(undefined, {
        address: body.results[0].providedLocation.location,
        latitude: body.results[0].locations[0].displayLatLng.lat,
        longitude: body.results[0].locations[0].displayLatLng.lng
      })
    }

  });
}

module.exports.geocodeAddress = geocodeAddress
