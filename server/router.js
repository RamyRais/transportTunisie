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
//TODO change to src to dist in production done just for test but must be removed after setting the scripts
if (env === 'production') {
  server.use(express.static(path.resolve(__dirname + '/../public/src')));
  server.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname + '/../public/src/index.html'), {
      maxAge: 0
    });
  });
}

module.exports = http;