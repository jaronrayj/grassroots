var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {

  app.get("/api/login", passport.authenticate("local"), function (req, res) {
    res.json("/members");
  });

  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.User.create({
      username: req.body.username,
      password: req.body.password
    })
      .then(function () {
        res.redirect(307, "/api/login");
      })
      .catch(function (err) {
        console.log(err);
        res.json(err);
      });
  });

  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      res.json({});
    } else {
      res.json({
        password: req.user.password,
        id: req.user.id
      });
    }
  });
};
