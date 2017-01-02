var express = require('express');
var app = express();
var config = require('./config.js');
var path = require('path');
var routes = require('./routes.js');
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var protocolConfig = require('./protocol');

protocolConfig(io);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

http.listen(config.port, () => {
  console.log(`Listening on port ${config.port}.`);
});
