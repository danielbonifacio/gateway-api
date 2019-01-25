const { Router } = require('express')
const axios = require('axios')
const router = Router()

const services = require('./services')

const getUrlFromService = service => {
  const { host, port, https } = service

  return `${https ? 'https' : 'http'}://${host}${port ? `:${port}` : ''}`
}


services.map(service => {
  const serviceUrl = getUrlFromService(service)

  router
    .all(`/${service.name}*`, async function (req, res, next) {
  
      const url = serviceUrl + req.originalUrl
      const method = req.method.toLowerCase()
      const headers = req.headers
      const data = req.body

      console.log(url)

  
      axios({
        url,
        method,
        headers,
        data
      })
        .then(({ data }) => {
          res.status(200).send(data)
        })
        .catch(({ response }) => {
          res.status(response.status).send(response.data)
        })
    })
})



module.exports = router
