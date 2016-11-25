var express = require('express')
var app = express()

app.post('/', function (req, res) {
  console.log(req)
  res.status(200)
})

app.listen(process.env.PORT || 5000, function () {
  console.log('Example app listening on port 3000!')
})
