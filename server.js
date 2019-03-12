require('dotenv').config()

const lang = require('./src/lang')
const say = require('./src/helpers/say')
const app = require('./src/app')

console.clear()

const port = process.env.PORT || 4000

app.listen(port, (err) =>
    err
        ? say(lang.server.error, { error: err.message })
        : say(lang.server.started, { port })
)
