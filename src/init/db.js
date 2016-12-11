var getSeeds = require("../loaders/seeds")

module.exports = movies => {
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
}
