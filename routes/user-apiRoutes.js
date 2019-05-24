var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/project_home");
  });
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.User.create({
      user_name: req.body.user_name,
      password: req.body.password,
      email: req.body.email
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        console.log(err);
        res.json(err);
        // res.status(422).json(err.errors[0].message);
      });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Get all users with their projects
  app.get("/api/users", function (req, res) {
    db.User.findAll({
      include: [
        {
          model: db.Project,
          through: {
            attributes: ["ProjectId", "UserId"]
          }
        }
      ]
    }).then(function () {
      res.json(data);
    });
  });

  // Create a new user
  // app.post("/api/users", function (req, res) {
  //   db.User.create(req.body)
  //     .then(function (data) {
  //       res.json(data);
  //     })
  //     .catch(function (err) {
  //       if (err) throw err;
  //     });
  // });
  //Get a specific user by id, joined with their projects
  app.get("/api/users/:id", function (req, res) {
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
        id: req.params.id
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
