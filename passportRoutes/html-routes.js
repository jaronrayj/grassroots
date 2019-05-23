var path = require("path");
var isAuthenticated = require("../config/middleware/Authenticated");

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
};
