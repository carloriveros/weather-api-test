var asyncAdd = (a,b) => {
  return new Promise((resolve,reject) => {
    setTimeout(function () {
      if(typeof a === 'number' && typeof b === 'number'){
        resolve(a+b);
      }else{
        reject("you have to input numbers")
      }
    }, 1500);
  })
}

asyncAdd(5,"7").then((res) => {
  console.log(res)
  return asyncAdd(res,33);
}).then((res) => {
  console.log(res)
}).catch((error) => {
  console.log(error)
});

// var somePromise = new Promise((resolve,reject) => {
//   setTimeout(function () {
//     //resolve('Hey. It worked');
//     reject('unable to fulfill promise')
//   }, 2500);
// });
// somePromise.then((message) => {
//   console.log("Success")
//   console.log(message)
// },(errorMessage) => {
//   console.log("Failure")
//   console.log(errorMessage)
//
// })
