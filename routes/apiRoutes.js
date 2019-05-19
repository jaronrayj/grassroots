var db = require("../models");

module.exports = function (app) {
  // Get all examples
  app.get("/api/users", function (req, res) {
    db.User.findAll({}).then(function (data) {
      res.json(data);
    });
  });

  // Create a new example
  app.post("/api/users", function (req, res) {
    db.User.create({
      user_name: req.body.user_name,
      password: req.body.password,
      email: req.body.email,
      logged_in: true
    }).then(function (data) {
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
