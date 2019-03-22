const User = require("../models/User");
const hash = require("../hash");
const jwt = require("jsonwebtoken");

//verifies Token
const verifyToken = function (req, res, next) {
    //Get auth header value
    const bearerHeader = req.headers["authorization"];
    // Check if bearer is undefined
    if (typeof bearerHeader !== undefined) {
        // Split at the space
        const bearer = bearerHeader.split(" ");
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    }
    else {
        res.sendStatus(403);
    }
}

module.exports = function (app) {

    //-------------routes to register/login-------------

    //route to register
    app.post("/api/users/registration", function (req, res) {
        const salt = hash.generateSalt();
        const newPassword = hash.encrypt(req.body.password, salt);
        const user = {
            username: req.body.username,
            password: newPassword,
            salt: salt
        };
        User.create(user).then(function (newUser) {
            res.json(newUser);
        }).catch(function (error) {
            res.json({ error: error });
        });
    });

    //route to login
    app.post("/api/users/session", function (req, res) {
        User.findOne({ username: req.body.username }).then(function (user) {
            const passwordCheck = hash.encrypt(req.body.password, user.salt);
            if (user.password === passwordCheck) {
                const verifiedUser = {
                    _id: user._id
                }
                jwt.sign(verifiedUser, "funfunfun", { expiresIn: "3h" }, function (err, token) {
                    res.json({ verifiedUser, token });
                });
            }
            else {
                res.json("Wrong Password");
            }
        })
            .catch(function (error) {
                res.json({ error: error });
            });
    });

  //-------------Data Retrieval Routes.  -------------------
    //route to retrieve a profile by userId. THIS IS AN EXAMPLE OF HOW WE SHOULD QUERY WTH TOKEN.
    //This needs to be replaced with a valid route once other models are created.
    app.get("/api/users/:userId", verifyToken, function (req, res) {
        jwt.verify(req.token, "funfunfun", function (err, authData) {
            if (err) {
                res.sendStatus(403);
            } else {
                User.findById(req.params.userId).populate("profile").then(function (user) {
                    res.json(user.profile);
                }).catch(function (error) {
                    res.json({ error: error });
                });
            }
        });
    });

      v
    //route to retrieve all users for dev purposes. THIS SHOULD NOT BE IN PRODUCTION
    app.get("/api/users", function (req, res) {
        User.find().then(function (allUsers) {
            res.json(allUsers);
        }).catch(function (error) {
            res.jason({ error: error });
        });
    });


};