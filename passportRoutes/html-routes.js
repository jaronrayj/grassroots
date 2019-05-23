var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/", function (req, res) {
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public-passport/signup.html"));
  });

  app.get("/login", function (req, res) {
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public-passport/members.html"));
  });

  app.get("/members", isAuthenticated, function (req, res) {
    res.sendFile(path.join(__dirname, "../public-passport/members.html"));
  })
};
