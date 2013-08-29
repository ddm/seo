var express = require('express');
var http = require('http');
var path = require('path');
var suggest = require('./google-suggestions');
var recommend = require('./keyword-recommendations');

var app = express();

var enableCors = function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Accept, Origin, Referer, User-Agent, Content-Type, Authorization');
  if ('OPTIONS' == req.method) {
    res.send(200);
  } else {
    next();
  }
};

app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(enableCors);
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.errorHandler());

app.get('/suggest/:keyword', function (req, res) {
  suggest(req.params.keyword, function (suggestions) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(suggestions, null, 2));
  });
});

app.get('/recommend/:keyword', function (req, res) {
  recommend(req.params.keyword, function (recommendations) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(recommendations, null, 2));
  });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port ", app.get('port'));
});
