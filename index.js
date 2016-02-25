'use strict';
var urlLib = require('url');
var http = require('http');
var https = require('https');
var Q = require('q');

var retrive = function (url) {
  var redirectCount = 0;

  var get = function (url) {
    var protocol = urlLib.parse(url).protocol === 'https:' ? https : http;
    var deferred = Q.defer();

    var req = protocol.request(url, function (res) {
      var data = '';

      res.setEncoding('utf8');

      // Code for url redirect
      // Response code 302 is for url redirect
      if (res.statusCode < 400 && res.statusCode >= 300 && res.headers.location) {
        if (++redirectCount > 10) {
          deferred.reject(new Error('Redirected 10 times. Aborting.'));
        }

        // Recursive call to get
        return get(urlLib.resolve(url, res.headers.location));
      }

      if (res.statusCode !== 200) {
        deferred.resolve(res.statusCode);
      }

      res.on('data', function (payload) {
        data = data + payload;
      });

      res.on('end', function () {
        deferred.resolve(data);
      });
    });

    req.on('error', function (err) {
      deferred.reject(err);
    });

    req.end();

    return deferred.promise;
  };

  return get(url);
};

module.exports = retrive;
