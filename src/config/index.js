const lang = require('./lang')

module.exports = {
    lang,
    auth: {
        secret: process.env.SECRET
    }
}
