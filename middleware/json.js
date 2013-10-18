module.exports = function jsonContentType (req, res, next) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
};


