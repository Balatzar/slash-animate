var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function (req, res) {
  console.log(req.body)

  var response = {
    "response_type": "in_channel",
    "text": ":full_moon_with_face:",
  }
  res.status(200).json(response)
})

app.listen(process.env.PORT || 5000, function () {
  console.log('Example app listening on port 3000!')
})
