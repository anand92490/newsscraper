var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");


// Require all models
var db = require("./models");

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();


// Useing morgan logger for logging requests
app.use(logger("dev"));

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));


// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



var MONGODB_URI = process.env.MONGODB_URI || "mongodb://anand92490:Cartmanguy!1@ds335678.mlab.com:35678/heroku_599zhbfr";

mongoose.connect(MONGODB_URI);


require("./routes/index.js")(app);


app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });