var fs = require("fs")

var never = fs.readFileSync("./nevergonna", "utf8")

var json = {
  name: "never",
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

fs.writeFileSync("./nevergonna.json", JSON.stringify(json))
