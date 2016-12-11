var fs = require("fs")

module.exports = () => {
  var demo = {
    name: "demo",
    frames: [
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
    ],
    description: "Une petite animation sympa pour montrer ce que peut faire l'app",
  }
  var never = JSON.parse(fs.readFileSync("./assets/seeds/nevergonna.json", "utf8"))
  var starwars = JSON.parse(fs.readFileSync("./assets/seeds/starwars.json", "utf8"))
  return [demo, never, starwars]
}
