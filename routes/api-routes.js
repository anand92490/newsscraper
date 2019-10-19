const cheerio = require("cheerio");
const axios = require("axios");
const db = require("../models");

module.exports = function(app) {
 
  // post
  app.post("/api/scrape", function(req, res) {
    axios.get("https://thehimalayantimes.com").then(function(response) {
      var $ = cheerio.load(response.data);

      $(".mainNews").each(function(i, element) {
        // Save an empty result object
       let headline = $(this)
       .find("h4")
       .find("a")
       .text();

       let summary = $(this)
       .find("p")
       .text();

       let link = $(this)
       .find("a")
       .attr("href");

       let image = $(this)
       .find("img")
       .attr("src");

      
        let headlineObject = {
          headline: headline,
          summary: summary,
          link: link,
          image: image
        };

        db.Headline.create(headlineObject, function(error) {
          if (error)
            console.log("Article already exists: " + headlineObject.headline);
          else {
            console.log("Headline: " + headlineObject.headline);
            console.log("-------------------------------------")
            console.log("Summary: " + headlineObject.summary);
            console.log("-------------------------------------")
            console.log("link: " + headlineObject.link);
            console.log("-------------------------------------")
            console.log("image: " + headlineObject.image);
            console.log("-------------------------------------")

          }

          if (i == $("article.item").length - 1) {
            res.json("scrape complete");
          }
        });
      });
    });
  });

 
  

};
