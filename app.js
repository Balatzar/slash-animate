var express = require('express')
var app = express()

app.post('/', function (req, res) {
  res.send(JSON.stringify(req))
})

app.listen(process.env.PORT || 5000, function () {
  console.log('Example app listening on port 3000!')
})
