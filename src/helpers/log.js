const moment = require('moment')

const request = ({ method, originalUrl }, service, status) => {
    const date = moment().format('YYYY-MM-D h:mm:ss')
    return `${date} ${method} ${originalUrl} ${status}`
}

module.exports = {
    request
}
