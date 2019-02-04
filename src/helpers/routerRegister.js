const http = require('axios')
const { request } = require('./log')
const auth = require('../middlewares/auth')

/**
 * Recupera a URL do serviço
 * @param {object} service Serviço
 */
const getUrlFromService = ({ host, port, https, prefix }) => `${https ? 'https' : 'http'}://${host}${port ? `:${port}` : ''}`

/**
 * Registra todas as rotas.
 * ========================
 * 
 * @param {object} services serviços a serem registrados
 * @param {object} router objeto router do express
 */
const register = (services, router) => {
  services.map(service => {
    const serviceUrl = getUrlFromService(service)
    
    router.all(`/${service.prefix ? `${service.prefix}` : ''}*`, auth, async function (req, res) {
      const { originalUrl } = req
      
      const url = serviceUrl + originalUrl.replace(`/${service.prefix}`, '')
      
      const method = req.method.toLowerCase()
      const headers = req.headers
      const data = req.body

      // status que será feito o log
      let status = 200

      // requisita o serviço indicado
      await http({
          url,
          method,
          headers,
          data
        })
        .then(response => {
          res.status(response.status).send(response.data)
        })
        .catch(error => {
          // caso haja uma resposta do serviço
          if (error.response) {
            const { response } = error
            status = response.status
            res
              .status(status)
              .send(response.data)
          } else {
            status = 500
            res
              .status(status)
              .send({ message: `Não foi possível se conectar ao serviço ${service.name}` })
          }
        })

      /**
       * Loga as informações da requisição no servidor
       * TODO: Deixar essa opção parametrizável
       */
      const log = request(req, service, status)
      console.log(log)
    })
  })
}

module.exports = register
