var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var post = require("post-json")

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function (req, res) {
  console.log(req.body)
  var url = "https://slack.com/api/chat.postMessage?token=" + process.env.slack + "&channel=%23testage&text=";
  var urlText = url += encodeURIComponent(":full_moon_with_face:")

  console.log(urlText)

  var response = {
    "response_type": "in_channel",
    "text": ":full_moon_with_face:",
  }
  res.status(200).json(response)

  post(urlText, {}, function (err, result) {
    if (err) {
      console.warn(err)
    } else {
      console.log(result)
    }
  })
})

app.listen(process.env.PORT || 5000, function () {
  console.log('Example app listening on port 3000!')
})
