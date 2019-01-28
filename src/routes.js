const { Router } = require('express')
const axios = require('axios')
const { request } = require('./helpers/log')
const services = require('./services.map')

const router = Router()

const getUrlFromService = service => {
  const { host, port, https } = service

  return `${https ? 'https' : 'http'}://${host}${port ? `:${port}` : ''}`
}


services.map(service => {
  const serviceUrl = getUrlFromService(service)

  router
    .all(`/${service.name}*`, async function (req, res) {
  
      const url = serviceUrl + req.originalUrl
      const method = req.method.toLowerCase()
      const headers = req.headers
      const data = req.body

      let status = 200
  
      await axios({
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
            status = response.status
          } else {
            res.status(500).send({ message: 'Houve um erro ao se comunicar com a API' })
            status = 500
          }
        })

      /**
       * Log da requisição no console
       * Informa se houve sucesso ou erro
       */
      const log = request(req, service, status)
      console.log(log)
    })
})

module.exports = router
