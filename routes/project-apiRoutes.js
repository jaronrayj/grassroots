
var db = require("../models");

module.exports = function (app) {
    // PROJECTS //
    // Get all projects with their users
    app.get("/api/projects", function (req, res) {
        db.Project.findAll({
            include: [{
                model: db.User,
                through: {
                    attributes: ["ProjectId", "UserId"]
                }
            }]
        }).then(function (data) {
            res.json(data);
        });
    });

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
            include: [{
                model: db.User,
                through: {
                    attributes: ["ProjectId", "UserId"]
                }
            }],
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
        db.Project.update(
            req.body, {
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
