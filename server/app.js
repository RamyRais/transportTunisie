'use strict';

var env = process.env.NODE_ENV || 'development',
  configPath = './config/';
if(env === 'production') {
  configPath += 'config.prod.json';
} else {
  configPath += 'config.dev.json'
}

var server = require('./router'),
  config = require(configPath);

var serve = server.listen(config.port, function() {
  var host = serve.address().address;
  var port = serve.address().port;
  if (host === '::') {
    host = 'localhost';
  }
  console.log('Server listening at http://%s:%s', host, port);
});
