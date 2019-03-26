const Account = require("../models/Account");
const hash = require("../hash");
const jwt = require("jsonwebtoken");
const checkAuth = require('../checkAuth');
const Gif = require("../models/Gifs");


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
            familyname: req.body.familyname,
            salt: salt
        };
        Account.create(user).then(function (newUser) {
            res.json(newUser);
        }).catch(function (error) {
            res.json({ error: error });
        });
    });

    //route to login
    app.post("/api/users/session", function (req, res) {
        Account.findOne({ username: req.body.username }).then(function (user) {
            const passwordCheck = hash.encrypt(req.body.password, user.salt);
            if (user.password === passwordCheck) {
                const verifiedUser = {
                    acct_id: user._id,
                    famName: user.familyname
                }
                jwt.sign(verifiedUser, process.env.JWT_KEY, { expiresIn: "3h" }, function (err, token) {
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
    app.get("/api/users/:userId", verifyToken, checkAuth, function (req, res) {
        Account.findById(req.params.userId).then(function (user) {
            res.json(user);
        }).catch(function (error) {
            res.json({ error: error });
        });
    });

    //route to retrieve all users for dev purposes. THIS SHOULD NOT BE IN PRODUCTION
    app.get("/api/users", function (req, res) {
        Account.find().then(function (allUsers) {
            res.json(allUsers);
        }).catch(function (error) {
            res.jason({ error: error });
        });
    });

    app.post("/api/gifs", function (req, res) {
        Gif.insertMany(req.body).then(function (newGif) {
            res.json(newGif);
        }).catch(function (error) {
            res.json({ error: error });
        });
    })


    //Returns 1 random Gif document
    app.get("/api/gifs", function (req, res) {
        Gif.count().exec(function (err, count) {

            // Get a random entry
            var random = Math.floor(Math.random() * count)

            // Again query all gifs but only fetch one offset by our random #
            Gif.findOne().skip(random).exec(
                function (err, result) {
                    // Tada! random gif
                    res.json(result)
                })
        })
    });

};