module.exports = function cacheControl (req, res, next) {
  var maxAgeInSeconds = 3600;
  var now = new Date();
  var expiringDate = new Date(now.getTime() + maxAgeInSeconds*1000);
  res.setHeader('Expires', expiringDate.toUTCString());
  res.setHeader('Cache-Control', "public; no-transform; max-age=" + maxAgeInSeconds + "; max-stale=" + 2*maxAgeInSeconds + ";");
  next();
};


