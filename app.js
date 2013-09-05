var express = require('express');
var http = require('http');
var path = require('path');
var middleware = require('./middleware');
var api = require('./api');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(middleware.cache);
app.use(middleware.cors);
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.errorHandler());

api.routes(app, middleware);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port ", app.get('port'));
});
