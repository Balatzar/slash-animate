var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var post = require("post-json")

var urlCreator = require("./src/modules/url_creator")

var base = "https://slack.com/api/"

var anim = [
  `:house:${"  ".repeat(20)}:runner2:`,
  `:house:${"  ".repeat(19)}:runner3:`,
  `:house:${"  ".repeat(18)}:runner4:`,
  `:house:${"  ".repeat(17)}:runner3:`,
  `:house:${"  ".repeat(16)}:runner2:`,
  `:house:${"  ".repeat(15)}:runner:`,
  `:house:${"  ".repeat(14)}:runner2:`,
  `:house:${"  ".repeat(13)}:runner3:`,
  `:house:${"  ".repeat(12)}:runner4:`,
  `:house:${"  ".repeat(11)}:runner3:`,
  `:house:${"  ".repeat(10)}:runner2:`,
  `:house:${"  ".repeat(9)}:runner:`,
  `:house:${"  ".repeat(8)}:runner2:`,
  `:house:${"  ".repeat(7)}:runner3:`,
  `:house:${"  ".repeat(6)}:runner4:`,
  `:house:${"  ".repeat(5)}:runner3:`,
  `:house:${"  ".repeat(4)}:runner2:`,
  `:house:${"  ".repeat(3)}:runner:`,
  `:house:${"  ".repeat(2)}:runner2:`,
  `:house:${"  ".repeat(1)}:runner3:`,
]

app.use(bodyParser.json({ limit: "5mb" }))
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/", function (req, res) {
  console.log(req.body)
  var url = "https://slack.com/api/chat.postMessage?token=" + process.env.slack + "&channel=%23testage&text="
  var urlText = url + encodeURIComponent(`:house:${"  ".repeat(21)}:runner:`)

  console.log(urlText)

  var response = {
    "response_type": "in_channel",
  }
  res.status(200).json(response)

  post(urlText, {}, function (err, result) {
    if (err) {
      console.warn(err)
    } else {
      console.log(result.body)
      var msg = JSON.parse(result.body)

      var editUrl = "https://slack.com/api/chat.update?token=" + process.env.slack + "&ts=" + msg.ts + "&channel=" + msg.channel + "&text="

      var j = 20

      var interval = setInterval(() => {
        j -= 1
        if (!j) {
          clearInterval(interval)
          var params = {
            token: process.env.slack,
            ts: msg.ts,
            channel: msg.channel,
          }
          post(urlCreator(base, "chat.delete", params), {}, logging)
        }
        var text = anim[j]

        post(editUrl + encodeURIComponent(text), {}, logging)
      }, 200)
    }
  })
})

app.listen(process.env.PORT || 5000, function () {
  console.log("Example app listening on port 3000!")
})

function logging (err, res) {
  if (err) {
    console.warn(err)
  } else {
    console.log(res.body || res)
  }
}
