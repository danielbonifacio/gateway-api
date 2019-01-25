const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

// secret token
const secret = config.auth.secret

function create (user) {
  const payload = {
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(1, 'day').unix()
  }

  return jwt.encode(payload, secret)
}

function decode (token) {
  return new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, secret)

      payload.exp <= moment.unix()
        ? reject({
          status: 401,
          message: 'Token expirado.'
        })
        : resolve(payload.sub)

    } catch (err) {
      reject({
        status: 500,
        message: 'Token inválido.'
      })
    }
  })
}

module.exports = {
    decode,
    create
}