// Requiring necessary npm middleware packages
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("./config/passport");
// Setting up port
var PORT = process.env.PORT || 8080;
var db = require("./models");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
require("./routes/user-apiRoutes")(app);
require("./routes/project-apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Do/Don't delete the data in DB
var syncOptions = {
  force: false
};

// if test restart the data in DB
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

//Sync and create the database rows/cols and start the server...
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
