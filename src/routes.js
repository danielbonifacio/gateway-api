const { Router } = require('express')
const axios = require('axios')
const router = Router()

const services = require('./services.map')

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
  
      axios({
        url,
        method,
        headers,
        data
      })
        .then(({ data }) => {
          res.status(200).send(data)
        })
        .catch(err => {
          if (err.response) {
            const { response } = err
            res.status(response.status).send(response.data)
          } else {
            res.status(500).send({ message: 'Houve um erro ao se comunicar com a API' })
          }
        })
    })
})

module.exports = router
