var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.User.findAll({}).then(function() {
      res.render("index");
    });
  });
  
  app.get("/login", function(req, res) {
    db.User.findAll({}).then(function() {
      res.render("login");
    });
  });
 
  app.get("/projects", function(req, res) {
    db.User.findAll({}).then(function(username) {
      res.render("project", {
        msg: "Welcome!",
        name: username
      });
    });
  });

  // // Load example page and pass in an example by id
  // app.get("/projects/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
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
