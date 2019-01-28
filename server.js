require('dotenv').config()

const app = require('./src/app')

console.clear()
app.listen(4000, (err) =>
    err
        ? console.log('erro')
        : console.log('API iniciada')
)