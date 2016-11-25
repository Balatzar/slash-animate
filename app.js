var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var post = require("post-json")

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function (req, res) {
  console.log(req.body)
  var response_url = req.body.response_url

  var response = {
    "response_type": "in_channel",
    "text": ":full_moon_with_face:",
  }
  res.status(200).json(response)

  for (i = 0; i < 20; i += 1) {
    post(response_url, response, function (err, result) {
      if (err) {
        console.warn(err)
      } else {
        console.log(result)
      }
    })
  }
})

app.listen(process.env.PORT || 5000, function () {
  console.log('Example app listening on port 3000!')
})
