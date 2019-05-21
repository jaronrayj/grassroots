var db = require("../models");

module.exports = function (app) {
  //USERS//
  // Get all users
  app.get("/api/users", function (req, res) {
    db.User.findAll().then(function (data) {
      res.json(data);
    });
  });

  // Create a new user
  app.post("/api/users", function (req, res) {
    db.User.create(req.body)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        if (err) throw err;
      });
  });

  // //Get a specific user by id, joined with their projects
  // app.get("/api/users/:id", function (req, res) {
  //   db.User.find({
  //     include: [db.Project],
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function (data) {
  //     res.json(data);
  //   });
  // });

  //PROJECTS//
  //Get all projects
  app.get("/api/projects", function (req, res) {
    db.Project.findAll().then(function (data) {
      res.json(data);
    });
  });
  //Create a new project
  app.post("/api/projects", function (req, res) {
    db.Project.create(req.body)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
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

