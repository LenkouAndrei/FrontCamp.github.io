const express = require('express')
const app = express()
const routes = require('./routes')
const port = 3000

app.use('/', routes);

app.set('view engine', 'pug');

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})