const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
      req.user = decoded
      next();
    } catch (err) {
      res.status(400).send('Invalid token.')
    }
  } else {
    return res.status(401).send('Access denied. No token provided.')
  }
}