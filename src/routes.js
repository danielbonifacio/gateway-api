const { Router } = require('express')
const services = require('./services.map')
const routerRegister = require('./helpers/routerRegister')
const router = Router()

routerRegister(services, router)

module.exports = router
