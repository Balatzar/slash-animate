var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var post = require("post-json")

app.use(bodyParser.json({ limit: "5mb" }))
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/", function (req, res) {
  console.log(req.body)
  var url = "https://slack.com/api/chat.postMessage?token=" + process.env.slack + "&channel=%23testage&text="
  var urlText = url + encodeURIComponent(`:house:${"  ".repeat(21)}:runner:`)

  console.log(urlText)

  res.status(200)

  post(urlText, {}, function (err, result) {
    if (err) {
      console.warn(err)
    } else {
      console.log(result.body)
      var msg = JSON.parse(result.body)

      var editUrl = "https://slack.com/api/chat.update?token=" + process.env.slack + "&ts=" + msg.ts + "&channel=" + msg.channel + "&text="

      var space = "  "

      var j = 20

      var interval = setInterval(() => {
        j -= 1
        if (!j) {
          clearInterval(interval)
        }
        var text = `:house:${space.repeat(j)}${j > 1 ? ":runner:" : ""}`

        post(editUrl + encodeURIComponent(text), {}, (error, r) => {
          if (error) {
            console.warn(error)
          } else {
            console.log(r.body)
          }
        })
      }, 200)
    }
  })
})

app.listen(process.env.PORT || 5000, function () {
  console.log("Example app listening on port 3000!")
})
