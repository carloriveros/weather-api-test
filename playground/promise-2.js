const request = require('request');

var geocodeAddress = (address) => {
  return new Promise( (resolve,reject) => {
    encode_address = encodeURIComponent(address)
    request({
      url:'http://www.mapquestapi.com/geocoding/v1/address?key=uYj79DApCUiljtG2BU27Pnq6qmM0lzAo&location='+encode_address,
      json:true
    }, (error,response,body) => {
      if(error){
        reject('unable to connect to server')
      } else if (body.results[0].locations[0].geocodeQualityCode.includes('P1CXX')) {
        reject('address not found')
      }else{
        //console.log(JSON.stringify(body, undefined, 2)); //prettify
        resolve({
          address: body.results[0].providedLocation.location,
          latitude: body.results[0].locations[0].displayLatLng.lat,
          longitude: body.results[0].locations[0].displayLatLng.lng
        })
      }

    });
  });

}

geocodeAddress('19146').then((location) => {
  console.log(location)
},(errorMessage) => {
  console.log(errorMessage)
})
