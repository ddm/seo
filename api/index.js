var suggest = require('./suggest');
var recommend = require('./recommend');

module.exports = {

  routes: function configureRoutes (app, middleware) {
    app.get('/suggest/:keyword', middleware.json, function (req, res) {
      suggest(req.params.keyword, function (suggestions) {
        res.end(JSON.stringify(suggestions, null, 2));
      });

    });
    app.get('/recommend/:keyword', middleware.json, function (req, res) {
      recommend(req.params.keyword, function (recommendations) {
        res.end(JSON.stringify(recommendations, null, 2));
      });
    });
  }

};


