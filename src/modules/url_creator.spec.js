var test = require("tape")
var urlCreator = require("./url_creator")

test("timing test", (t) => {
  t.plan(3)

  t.equal(urlCreator("https://slack.com/api/", "chat.update", { text: "coucou" }), "https://slack.com/api/chat.update?text=coucou")
  t.equal(urlCreator("https://slack.com/api/", "chat.update"), "https://slack.com/api/chat.update")
  t.equal(urlCreator("https://slack.com/api"), "https://slack.com/api")
})
