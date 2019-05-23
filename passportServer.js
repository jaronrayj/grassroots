// Requiring necessary npm middleware packages
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
// Setting up port
var PORT = process.env.PORT || 8080;

var db = require("./models");
//
// Creating express app and configuring middleware
//needed to read through our public folder
var app = express();
app.use(bodyParser.urlencoded({ extended: false })); //For body parser
app.use(bodyParser.json());
app.use(express.static("public"));
//
//we are doing a GET to test if our server is working fine
app.get("/", function (req, res) {
  res.send("Welcome to Passport with Sequelize and without HandleBars");
});
//
//this will listen to and show all activities on our terminal to
//let us know what is happening in our app
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎 Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
