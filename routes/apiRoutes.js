var db = require("../models");

module.exports = function(app) {
  //USERS//
  // Get all users
  app.get("/api/users", function(req, res) {
    db.User.findAll().then(function(data) {
      res.json(data);
    });
  });

  // Create a new user
  app.post("/api/users", function(req, res) {
    db.User.create(req.body)
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        if (err) throw err;
      });
  });

  // Delete a user
  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        if (err) throw err;
      });
  });

  // PROJECTS //
  // Get all projects
  app.get("/api/projects", function(req, res) {
    db.Project.findAll().then(function(data) {
      res.json(data);
    });
  });

  // Create a new project
  app.post("/api/projects", function(req, res) {
    db.Project.create(req.body)
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        if (err) throw err;
      });
  });

  // Get single project info
  app.get("/api/projects/:id", function(req, res) {
    db.Project.findOne({
        where: {
          id: req.params.id
        }
      })
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        if (err) throw err;
      })
  });

  // Delete a specific project
  app.delete("/api/projects/:id", function(req, res) {
    db.Project.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function(data) {
        res.json(data);
      })
      .catch(function(err) {
        if (err) throw err;
      });
  });

};