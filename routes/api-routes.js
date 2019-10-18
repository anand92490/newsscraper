const cheerio = require("cheerio");
const axios = require("axios");
const db = require("../models");


module.exports = function(app) {
      


app.post("/api/scrape", function(req, res) {
  axios.get("https://thehimalayantimes.com").then(function(response) {

    var $ = cheerio.load(response.data);

  
    $(".mainNews").each(function(i, element) {
    // Save an empty result object
        var result = {};

        result.title = $(this).find('h4').find('a').text();
        result.summary = $(this).find("p").text();
        result.link = $(this).find("a").attr("href");
        result.image = $(this).find('img').attr('src');
       

      db.Headline.create(result)
        .then(function(dbHeadline) {
          console.log(dbHeadline);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    });
    console.log(result);
    // Send a message to the client
    res.send("Scrape Complete");
  });
});




};