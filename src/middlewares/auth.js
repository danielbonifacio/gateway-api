const Token = require('../services/token')
const lang = require('../lang')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization

  // if authentication service, bypass the middleware
  const { originalUrl } = req
  if (/^\/auth/gi.test(originalUrl)) {
    return next()
  }

  if (!authHeader)
    return res
      .status(401)
      .send({ message: lang.token.notProvided })

  // bearer token verification
  const parts = authHeader.split(' ')
  const [scheme, token] = parts

  if (!parts.length === 2 || !/^Bearer$/i.test(scheme))
    return res
      .status(401)
      .send({ message: lang.token.malformatted })


  Token.decode(token)
    .then(response => {
      req.user = response;
      next()
    })
    .catch(err => {
      res
        .status(err.status)
        .send({ message: err.message })
    })
}
