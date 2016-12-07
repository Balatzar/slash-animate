var express = require("express")
var mongodb = require("mongodb")
var bodyParser = require("body-parser")
var post = require("post-json")

var urlCreator = require("./src/modules/url_creator")
var getSeeds = require("./src/loaders/seeds")

var base = "https://slack.com/api/"

var app = express()
var MongoClient = mongodb.MongoClient
var url = process.env.MONGODB_URI || "mongodb://localhost:27017/sash-animate"

app.use(bodyParser.json({ limit: "5mb" }))
app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.log("Unable to connect to the mongoDB server. Error:", err)
  } else {
    var movies = db.collection("movies")

    movies.find({}).toArray(function (err, result) {
      if (err) {
        console.log(err)
      } else if (!result.length) {
        var seeds = getSeeds()
        movies.insert(seeds, (err, res) => {
          if (err) {
            console.warn(err)
          } else {
            console.log("Created demos animation")
          }
        })
      }
    })

    app.post("/", function (req, res) {
      console.log(req.body)
      var name = req.body.text || "demo"

      movies.findOne({ name }, (err, movie) => {
        if (err) {
          console.warn(err)
        } else if (!movie) {
          const response = {
            response_type: "ephemeral",
            text: "Cette animation n'existe pas. Essayez 'demo' !",
          }
          res.status(200).json(response)
        } else {
          const response = {
            "response_type": "in_channel",
          }
          res.status(200).json(response)

          const params = {
            token: process.env.slack,
            channel: req.body.channel_id,
            text: movie.frames[0],
          }
          var urlPost = urlCreator(base, "chat.postMessage", params)
          console.log(urlPost)
          post(urlPost, {}, (error, result) => {
            if (error) {
              console.warn(error)
            } else {
              var msg = JSON.parse(result.body)
              var j = 1

              params.ts = msg.ts

              var interval = setInterval(() => {
                if (j === movie.frames.length - 1) {
                  clearInterval(interval)
                  post(urlCreator(base, "chat.delete", params), {}, logging)
                }
                params.text = movie.frames[j]
                j += 1

                var urlUpdate = urlCreator(base, "chat.update", params)
                console.log(urlUpdate)
                post(urlUpdate, {}, logging)
              }, 200)
            }
          })
        }
      })
    })

    app.listen(process.env.PORT || 5000, () => {
      console.log("Example app listening on port 3000!")
    })
  }
})

function logging (err, res) {
  if (err) {
    console.warn(err)
  } else {
    console.log(res.body || res)
  }
}
