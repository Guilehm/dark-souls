const express = require('express')

const DEBUG = process.env.DEBUG
const PORT = process.env.PORT || 4000

const app = new express()
const botController = require('./controllers/bot-controller')

app.get('/', botController)

app.listen(PORT, () => {
    let message = DEBUG ? 'Starting development server on port' : 'App listening on port'
    console.log(message, `${PORT}`)
})
