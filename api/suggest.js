var _ = require('underscore');
var request = require('request');
var parseString = require('xml2js').parseString;

function getGoogleSuggestions (keyword, callback) {
  var url = "http://google.com/complete/search?ie=utf8&oe=utf8&output=toolbar&q=" + encodeURIComponent(keyword);
  request({
      url: url,
      encoding: 'utf8',
      headers: {
          "Accept-Charset": "utf-8"
      }
  }, function(error, response, xmlResponse) {
    parseString(xmlResponse, function (err, jsonResponse) {
      var suggestions = _.uniq(_.filter(_.map(jsonResponse.toplevel.CompleteSuggestion, function (item) {
        var suggestion = item.suggestion[0].$.data;
        return suggestion.trim();
      }), function (suggestion) {
        return suggestion;
      }));
      callback(suggestions);
    });
  });
}

module.exports = getGoogleSuggestions;
