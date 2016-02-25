var retrive = require('./index.js');

retrive('https://nodejs.org/api/path.html')
  .then(function (data) {
    console.log(JSON.stringify(data));
  }, function (error) {
    console.log(error);
  });
