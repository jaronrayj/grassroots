require("dotenv").config();
var express = require("express");

// FIREBASE AUTHENTICATION --------------------------------->
var firebase = require("firebase/app");
require("firebase/auth");

var firebaseConfig = {
  apiKey: "AIzaSyA3QqXtwRNUb8tal061GneEXmCg5ySkQgM",
  authDomain: "grassroots-bbacc.firebaseapp.com",
  databaseURL: "https://grassroots-bbacc.firebaseio.com",
  projectId: "grassroots-bbacc",
  storageBucket: "grassroots-bbacc.appspot.com",
  messagingSenderId: "174098270905",
  appId: "1:174098270905:web:47388a2a647a4f3e"
};

firebase.initializeApp(firebaseConfig);
// END FIREBASE ------------------------------------------->

var app = express();
var PORT = process.env.PORT || 8080;

var db = require("./models");

// Middleware
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

app.use(express.static("public"));

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = {
  force: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
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