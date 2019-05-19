var db = require("../models");

module.exports = function (app) {
  // Get all examples

  // app.get("/api/users", function (req, res) {
  //   db.User.findAll({}).then(function (data) {
  //     res.json(data);
  //   });
  // });

  // Create a new example
  app.post("/api/users", function (req, res) {

    db.User.create(req.body).then(function (data) {
      console.log(data)
      res.json(data);
    }).catch(function (err) {
      if (err) throw err;
    });
  });


  //   // Delete an example by id
  //   app.delete("/api/users/:id", function(req, res) {
  //     db.Example.destroy({ where: { id: req.params.id } }).then(function(data) {
  //       res.json(data);
  //     });
  //   });

};