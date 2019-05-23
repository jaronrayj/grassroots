var db = require("../models");

module.exports = function (app) {
  // Get all users with their projects
  app.get("/api/users", function (req, res) {
    db.User.findAll({
      include: [{
        model: db.Project,
        through: {
          attributes: ["ProjectId", "UserId"]
        }
      }]
    }).then(function (data) {
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

  //Get a specific user by username, joined with their projects
  app.get("/api/users/:username", function (req, res) {
    db.User.findOne({
      include: [{
        model: db.Project,
        through: {
          attributes: ["ProjectId", "UserId"]
        }
      }],
      where: {
        user_name: req.params.username
      }
    }).then(function (data) {
      res.json(data);
    });
  });

  // Delete a user
  app.delete("/api/users/:id", function (req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        if (err) throw err;
      });
  });

};
