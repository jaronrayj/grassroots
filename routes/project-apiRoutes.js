var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  // // Using the passport.authenticate middleware with our local strategy.
  // // If the user has valid login credentials, send them to the members page.
  // // Otherwise the user will be sent an error
  // app.post("/api/login", passport.authenticate("local"), function (req, res) {
  //   // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
  //   // So we're sending the user back the route to the members page because the redirect will happen on the front end
  //   // They won't get this or even be able to access this page if they aren't authed
  //   res.json("/members");
  // });
  // // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // // otherwise send back an error
  // app.post("/api/signup", function (req, res) {
  //   console.log(req.body);
  //   db.User.create({
  //     email: req.body.email,
  //     password: req.body.password
  //   })
  //     .then(function () {
  //       res.redirect(307, "/api/login");
  //     })
  //     .catch(function (err) {
  //       console.log(err);
  //       res.json(err);
  //       // res.status(422).json(err.errors[0].message);
  //     });
  // });
  // //
  // // Route for logging user out
  // app.get("/logout", function (req, res) {
  //   req.logout();
  //   res.redirect("/");
  // });
  // // Get all projects with their users
  // app.get("/api/projects", function (req, res) {
  //   db.Project.findAll({
  //     include: [
  //       {
  //         model: db.User,
  //         through: {
  //           attributes: ["ProjectId", "UserId"]
  //         }
  //       }
  //     ]
  //   }).then(function (data) {
  //     res.json(data);
  //   });
  // });

  // LOOK INTO PULL THE USER"S DATA RETRIEVAL
  // Create a new project and create foreign keys between users and projects
  app.post("/api/projects", function (req, res) {
    db.Project.create(req.body)
      .then(function (data) {
        db.ProjectUser.create({
          ProjectId: data.id,
          //Need userId from user who created the project, just hard coded for now
          UserId: 1
        }).catch(function (err) {
          if (err) throw err;
        });
        res.json(data);
      })
      .catch(function (err) {
        if (err) throw err;
      });
  });

  // Get single project info
  app.get("/api/projects/:id", function (req, res) {
    db.Project.findOne({
      include: [
        {
          model: db.User,
          through: {
            attributes: ["ProjectId", "UserId"]
          }
        }
      ],
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

  // Get all projects with their users
  app.get("/api/projects", function (req, res) {
    db.Project.findAll({
      include: [
        {
          model: db.User,
          through: {
            attributes: ["ProjectId", "UserId"]
          }
        }
      ]
    }).then(function (data) {
      res.json(data);
    });
  });

  //Add a user to a project 
  app.post("/api/projects/:id/adduser", function (req, res) {
    db.ProjectUser.create({
      ProjectId: req.params.id,
      UserId: req.body.userId
    })
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        if (err) throw err;
      });
  });

  //Update a project
  app.put("/api/projects/:id", function (req, res) {
    db.Project.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      res.json(data);
    });
  });

  // Delete a specific project
  app.delete("/api/projects/:id", function (req, res) {
    db.Project.destroy({
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
