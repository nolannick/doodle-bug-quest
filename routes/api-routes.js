const User = require("../models/User");
const hash = require("../hash");
const jwt = require("jsonwebtoken");
const Account = require('../models/Account');
const FamilyMember = require('../models/FamilyMembers');

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


    //route to retrieve all users for dev purposes. THIS SHOULD NOT BE IN PRODUCTION
    app.get("/api/users", function (req, res) {
        User.find().then(function (allUsers) {
            res.json(allUsers);
        }).catch(function (error) {
            res.jason({ error: error });
        });
    });


    //route to retrieve all family members for a single account
    app.get("/api/familyMembers/:id", function (req, res) {
        FamilyMember.find({ acctId: req.params.id })
            .populate('acctId')
            .then(function (members) {
                res.json(members);
            })
            .catch(function (error) {
                res.jason({ error: error });
            });
    });

    // app.get("/api/familyMembers", function (req, res) {
    //     FamilyMember.find()
    //         .populate('acctId')
    //         .then(function (members) {
    //             res.json(members);
    //         })
    //         .catch(function (error) {
    //             res.jason({ error: error });
    //         });
    // });

    //MIGHT CHANGE THIS ROUTE TO USE USER MODEL 
    // retrived all accounts info for DEV purpose testing db connection and GET Accounts route
    app.get("/api/accounts", function (req, res) {
        Account.find()
            .then(function (account) {
                res.json(account);
            })
            .catch(function (error) {
                res.jason({ error: error });
            });
    });


    //================  Post Routes  =================== 
    //DELETE THIS ROUTE WHEN SWITCH TO AUTHENTICATED LOGIN ROUTE
    app.post('/api/login', function (req, res) {
        Account.find({
            username: req.body.username,
            password: req.body.password
        }).then(function (data) {
            // console.log('inside api', data);
            res.json(data);
        })
            .catch(function (err) {
                res.json(err);
            });
    });
    // testing route to create an entry in Account.js FOR DEV purpose SHOULD REMOVE LATER to work with User.js?
    app.post('/api/accounts', function (req, res) {
        Account.create(req.body)
            .then(function (account) {
                res.json(account);
            })
            .catch(function (err) {
                res.jason({ err: err })
            });
    });


    //route to create family members
    app.post('/api/familyMembers', function (req, res) {
        FamilyMember.create(req.body)
            .then(function (member) {
                res.json(member);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

    /**
    * these routes for testing purpose only
    */
    // for testing purpose
    app.delete("/api/familyMembers/:id", function (req, res) {
        FamilyMember.findOneAndDelete({ _id: req.params.id })
            .then(function (data) {
                res.json(data)
            }).catch(function (error) {
                res.json({ error: error });
            });
    });

    // for testing purpose
    app.delete("/api/accounts/:id", function (req, res) {
        Account.findOneAndDelete({ _id: req.params.id })
            .then(function (data) {
                res.json(data)
            }).catch(function (error) {
                res.json({ error: error });
            });
    });


};