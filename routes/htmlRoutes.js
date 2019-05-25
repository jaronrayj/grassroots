var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    if (req.user) {
      res.redirect("/projects");
    }
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  app.get("/login", function (req, res) {
    if (req.user) {
      res.redirect("/projects");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/new/projects", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/new_project.html"));
  });

  app.get("/my/projects", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/my_projects.html"));
  });

  // app.get("/copy/projects", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/project.html"));
  // });

  app.get("/projects", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public/project_home.html"));
  });

  // // Load example page and pass in an example by id
  // app.get("/projects/:id", functionq, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(functionExample) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
