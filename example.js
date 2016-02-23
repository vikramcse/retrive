var retrive = require('./index.js');

retrive('https://www.google.com', function (error, data) {
  if (!error) {
    console.log(data);
  } else {
    console.log(error);
  }
});
