var suggest = require('./suggest');
var recommend = require('./recommend');

function render (res) {
  return function renderJSON (data) {
    res.end(JSON.stringify(data, null, 2));
  };
}

module.exports = {

  routes: function configureRoutes (app, middleware) {
    app.get('/suggest/:keyword', middleware.json, function (req, res) {
      suggest(req.params.keyword, render(res));
    });
    app.get('/recommend/:keyword', middleware.json, function (req, res) {
      recommend(req.params.keyword, render(res));
    });
  }

};

