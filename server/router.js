'use strict';

// Modules
var express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  server = express(),
  http = require('http').Server(server);

server.use(bodyParser.json({
  limit: '50mb'
}));
server.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}));

var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  server.use(express.static(path.resolve(__dirname + '/../public/src')));
  server.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname + '/../public/src/index.html'));
  });
}
if (env === 'production') {
  server.use(express.static(path.resolve(__dirname + '/../public/dist'), {
    maxAge: '1y',
    setHeaders: function(res, path) {
      if (mime.lookup(path) === 'text/html') {
        res.setHeader('Cache-Control', 'public, max-age=0')
      }
    }
  }));
  server.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname + '/../public/dist/index.html'), {
      maxAge: 0
    });
  });
}

module.exports = http;