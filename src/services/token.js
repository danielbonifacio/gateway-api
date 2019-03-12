const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')
const lang = require('../lang')

const secret = config.auth.secret

const create = user => {
  const payload = {
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(1, 'day').unix()
  }

  return jwt.encode(payload, secret)
}

const decode = token => {
  return new Promise((resolve, reject) => {
    try {
      const payload = jwt.decode(token, secret)

      payload.exp <= moment.unix()
        ? reject({
          status: 401,
          message: lang.token.expired
        })
        : resolve(payload)

    } catch (err) {
      reject({
        status: 500,
        message: lang.token.invalid
      })
    }
  })
}

module.exports = {
  decode,
  create
}
