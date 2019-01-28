const moment = require('moment')

const request = ({ method, originalUrl }, service, status) => {
    return `Date: ${moment().format('YYYY-MM-D h:mm:ss')}\nMethod: ${method}\nService: ${service.name}\nEndpoint: ${originalUrl}\nStatus: ${status}\n---`
}

module.exports = {
    request
}