var fs = require("fs")

var file = "./starwars"

var never = fs.readFileSync(file, "utf8")

var json = {
  name: "starwars",
  frames: [""],
}

var lines = never.split("\n")

for (var i = 0, len = lines.length, j = 0; i < len; i += 1) {
  if (i % 14 === 0 && i) {
    console.log(json.frames[j])
    j += 1
    json.frames[j] = ""
  }
  json.frames[j] += lines[i] + "\n"
}

fs.writeFileSync(file + ".json", JSON.stringify(json))
