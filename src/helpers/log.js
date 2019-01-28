const moment = require('moment')

const request = ({ method, originalUrl }, service, status) => {
    const date = moment().format('YYYY-MM-D h:mm:ss')
    return `Date: ${date}\nMethod: ${method}\nService: ${service.name}\nEndpoint: ${originalUrl}\nStatus: ${status}\n---`
}

module.exports = {
    request
}