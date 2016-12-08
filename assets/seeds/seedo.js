var fs = require("fs")

var file = "./assets/seeds/starwars"

var never = fs.readFileSync(file, "utf8")

var json = {
  name: "starwars",
  frames: ["```\n"],
}

var lines = never.split("\n")

for (var i = 1, len = lines.length, j = 0, times = parseInt(lines[0][0] + lines[0][1]); i < len; i += 1) {
  if (i % 14 === 0) {
    json.frames[j] += "```\n"
    console.log("========")
    console.log(json.frames[j])
    console.log("========")
    var save = j
    for (var k = 1; k < times; k += 1) {
      json.frames.push(json.frames[save])
      j += 1
      console.log("========")
      console.log(json.frames[j])
      console.log("========")
    }
    j += 1
    json.frames[j] = ""
    times = parseInt(lines[i][0] + lines[i][1])
    i += 1
  }
  json.frames[j] += lines[i] + "\n"
}

// fs.writeFileSync(file + ".json", JSON.stringify(json))
