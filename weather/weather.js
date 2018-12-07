const request = require('request');

var getWeather = (lat,lng,callback) => {
  request({
    url:`https://api.darksky.net/forecast/813cd1480f8241637713ed34457e66a0/${lat},${lng}`,
    json:true
  }, (error,response,body) => {
    if(error){
      callback('unable to connect the server')
    }else if(body.code == 400){
      callback('error with the input arguments')
    }else{
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      })
    }
  });

}

module.exports.getWeather = getWeather
