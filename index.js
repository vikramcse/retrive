'use strict';
var urlLib = require('url');
var http = require('http');
var https = require('https');

var retrive = function (url, cb) {
  var redirectCount = 0;

  var get = function (url, cb) {
    var protocol = urlLib.parse(url).protocol === 'https:' ? https : http;

    protocol.get(url, function (res) {
      var data = '';

      // Code for url redirect
      // Response code 302 is for url redirect
      if (res.statusCode < 400 && res.statusCode >= 300 && res.headers.location) {
        if (++redirectCount > 10) {
          cb(new Error('Redirected 10 times. Aborting.'));
          return;
        }

        // Recursive call to get
        get(urlLib.resolve(url, res.headers.location), cb);
        return;
      }

      if (res.statusCode !== 200) {
        cb(res.statusCode);
        return;
      }

      res.setEncoding('utf8');

      res.on('data', function (payload) {
        data = data + payload;
      });

      res.on('end', function () {
        cb(null, data);
      });
    }).on('error', cb);
  };

  get(url, cb);
};

module.exports = retrive;
