const db = require('../models')

module.exports = function(app){

    
    app.get("/", function(req, res){

        var headlineObject = {};    
        headlineObject["articles"] = [];

        res.render("home")
        
    });

    

    app.get("/saved", function(req, res){
        var headlineObject = {};
        headlineObject["articles"] = [];


        res.render("saved")
    });
    
};