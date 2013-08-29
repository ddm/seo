var _ = require('underscore');
var request = require('request');
var parseString = require('xml2js').parseString;

function getGoogleSuggestions (keyword, callback) {
  var url = "http://google.com/complete/search?output=toolbar&q=" + encodeURIComponent(keyword);
  request(url, function(error, response, xmlResponse) {
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
