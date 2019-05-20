const db = require("../models");

const path = require("path");

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

// todo update html routes

module.exports = function(app) {

  app.get("/", function(req, res) {
    db.User.findAll({}).then(function() {
      res.sendFile(path.join(__dirname, "home.html"));
    });
  });

  app.get("/login", function(req, res) {
    db.User.findAll({}).then(function() {
      res.sendFile(path.join(__dirname, "login.html"));
    });
  });

  app.get("/projects", function(req, res) {
    db.User.findAll({}).then(function() {
      res.sendFile(path.join(__dirname, "project.html"));
    });
  });

  // // Load example page and pass in an example by id
  // app.get("/projects/:id", functioneq, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(functionbExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};