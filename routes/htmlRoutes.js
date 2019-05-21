var path = require("path");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/projects", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/project.html"));
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
  // app.get("*", function (req, res) {
  //   res.render("404");
  // });
};