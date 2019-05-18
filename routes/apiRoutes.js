var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  // Create a new example
  app.post("/api/users", function(req, res) {
    db.User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      loggedin: true
    }).then(function(data) {
      res.json(data);
    });
  });


//   // Delete an example by id
//   app.delete("/api/users/:id", function(req, res) {
//     db.Example.destroy({ where: { id: req.params.id } }).then(function(data) {
//       res.json(data);
//     });
//   });

};
