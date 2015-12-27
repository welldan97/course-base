module.exports = ->
  express = require('express')

  app = express()

  app.use(express.static('./src'))

  server = app.listen(3000, ->
    host = server.address().address
    port = server.address().port
    console.log 'Example app listening at http://%s:%s', host, port
    return
  )
