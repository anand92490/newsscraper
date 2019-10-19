const db = require('../models')

module.exports = function(app){

    
    app.get("/", function(req, res){

        var headlineObject = {};    
        headlineObject["articles"] = [];
        db.Headline.find({$query: {saved: false} }).sort( { date: -1 })
        .then(function(found) {
            if (found.length > 0) {
                for (let i = 0; i < found.length; i ++ ) {

                    // console.log(found[i]);

                    newObject = {
                        id: found[i]._id,
                        headline: found[i].headline,
                        summary: found[i].summary,
                        link: found[i].link,
                        image: found[i].image,
                        saved: found[i].saved,
                        notes: found[i].notes
                    }

                    headlineObject.articles.push(newObject);

                    if (i == (found.length - 1)) {
                        // res.json(headlineObject)

                        res.render("home", headlineObject)
                    }
                }
            }

            else {
                res.render("home")
            }

        });

    });


    
        


    

    app.get("/saved", function(req, res){
        var headlineObject = {};
        headlineObject["articles"] = [];


        res.render("saved")
    });









    
};