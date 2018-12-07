var getUser = (id, callback) => {
  var user = {
    id:id,
    name: 'Carlo'
  };
  setTimeout(function () {
    callback(user);
  }, 3000);
};

getUser(32, (userObj) => {
  console.log(userObj)
});
