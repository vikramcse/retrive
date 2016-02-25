var assert = require('assert');
var retrive = require('./index.js');

describe('Tests for retrive lib', function () {
  it('should get successful request', function (done) {
    retrive('https://nodejs.org/api/path.html')
      .then(function (data) {
        assert(/nodejs/.test(data));
        done();
      }, function (error) {
        console.log(error);
        assert(false);
        return;
      });
  });
});
