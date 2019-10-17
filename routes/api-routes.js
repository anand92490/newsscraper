const cheerio = require("cheerio");
const axios = require("axios");
const db = require("../models");


module.exports = function(app) {

app.post("/scrape", function(req, res) {
  axios.get("https://thehimalayantimes.com").then(function(response) {
    var $ = cheerio.load(response.data);

    $("h4").each(function(i, element) {
      var result = {};
      var title = $(element)
        .children()
        .text();
      // console.log(title);
      var link = $(element)
        .find("a")
        .attr("href");
      // console.log(link);

      db.Headline.create(result)
        .then(function(dbHeadline) {
          console.log(dbHeadline);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Send a message to the client
    res.send("Scrape Complete");
  });
});

};