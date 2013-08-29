var _ = require('underscore');
var async = require('async');
var request = require('request');
var parseString = require('xml2js').parseString;
var suggest = require('./google-suggestions');

function getRecommendations (keyword, callback) {
  suggest(keyword, function (suggestions) {
    async.reduce(suggestions, [], function (memo, suggestion, callback){
      suggest(suggestion, function (moreSuggestions) {
        callback(null, memo.concat(moreSuggestions));
      });
    }, function (err, result) {
      var recommendations = _.uniq(_.map(result, function (recommendation) {
        return recommendation.trim();
      }));
      callback(recommendations);
    });
  });
}

module.exports = getRecommendations;
