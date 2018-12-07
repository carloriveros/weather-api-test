console.log('Starting app');

setTimeout(function () {
  console.log("Inside of callback");
}, 2000);

setTimeout(function () {
  console.log("second callback")
}, 0);

console.log('Finishing up');

// for (var i = 0; i < 10000; i++) {
//   console.log(i)
// }
