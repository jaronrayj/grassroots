var db = require("../models");

module.exports = function(app) {
  //USERS//
  // Get all users with their projects
  app.get("/api/users", function(req, res) {
    db.User.findAll({
      include: [
        {
          model: db.Project,
          through: {
            attributes: ["ProjectId", "UserId"]
          }
        }
      ]
    }).then(function(data) {
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
        if (err) {
          throw err;
        }
      });
  });

  //Get a specific user by username, joined with their projects
  app.get("/api/users/:user_name", function(req, res) {
    db.User.findOne({
      include: [
        {
          model: db.Project,
          through: {
            attributes: ["ProjectId", "UserId"]
          }
        }
      ],
      where: {
        user_name: req.params.user_name
      }
    }).then(function(data) {
      res.json(data);
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
        if (err) {
          throw err;
        }
      });
  });

  // PROJECTS //
  // Get all projects with their users
  app.get("/api/projects", function(req, res) {
    db.Project.findAll({
      include: [
        {
          model: db.User,
          through: {
            attributes: ["ProjectId", "UserId"]
          }
        }
      ]
    }).then(function(data) {
      res.json(data);
    });
  });

  // Create a new project and create foreign keys between users and projects
  app.post("/api/projects", function(req, res) {
    db.Project.create(req.body)
      .then(function(data) {
        db.ProjectUser.create({
          ProjectId: data.id,
          //Need userId from user who created the project, just hard coded for now
          UserId: 1
        }).catch(function(err) {
          if (err) {
            throw err;
          }
        });
        res.json(data);
      })
      .catch(function(err) {
        if (err) {
          throw err;
        }
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
        if (err) {
          throw err;
        }
      });
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
        if (err) {
          throw err;
        }
      });
  });
};
