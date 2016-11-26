var test = require("tape")
var urlCreator = require("./url_creator")

test("timing test", (t) => {
  t.equal(urlCreator("https://slack.com/api/", "chat.update", { text: "coucou" }), "https://slack.com/api/chat.update?text=coucou")
  t.equal(urlCreator("https://slack.com/api/", "chat.update"), "https://slack.com/api/chat.update")
  t.equal(urlCreator("https://slack.com/api"), "https://slack.com/api")
  t.equal(urlCreator("https://slack.com/api/", "chat.update", {
    text: "coucou",
    ts: "21202102.321",
  }), "https://slack.com/api/chat.update?text=coucou&ts=21202102.321")

  t.end()
})
