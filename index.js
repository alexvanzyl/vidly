const winston = require('winston')
const express = require('express')
const app = express()

require('./bootstrap/logging')()
require('./bootstrap/db')()
require('./bootstrap/routes')(app)

const port = process.env.PORT || 3000
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`))
winston.info(`Running in ${process.env.NODE_ENV} mode`)

module.exports = server