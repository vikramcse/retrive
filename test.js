var assert = require('assert');
var retrive = require('./index.js');

describe('Tests for retrive lib', function () {
  it('should get successful request', function (done) {
    retrive('https://www.google.com', function (error, data) {
      if (error) {
        console.log(error);
        assert(false);
        return;
      }

      assert(/google/.test(data));
      done();
    });
  });
});
