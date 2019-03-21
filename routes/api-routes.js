const User = require("../models/User");


module.exports = function (app) {

    //route to retrieve all users
    app.get("/api/users", function (req, res) {
        User.find().then(function (allUsers) {
            res.json(allUsers);
        }).catch(function (error) {
            res.jason({ error: error });
        });
    });

    app.post("/api/users", function (req, res) {
        User.create(req.body)
            .then(function (newUser) {
                res.json(newUser);
            }).catch(function (error) {
                res.jason({ error: error });
            });
    });
};