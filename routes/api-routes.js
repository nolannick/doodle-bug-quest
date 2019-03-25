const Account = require("../models/Account");
const hash = require("../hash");
const jwt = require("jsonwebtoken");
<<<<<<< HEAD
const Account = require('../models/Account');
const FamilyMember = require('../models/FamilyMembers');
const Quest = require('../models/Quest');
=======
const checkAuth = require('../checkAuth');

>>>>>>> 396ef568bc902935d8d0a224a3b5dae58bb53ef1

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

<<<<<<< HEAD

=======
>>>>>>> 396ef568bc902935d8d0a224a3b5dae58bb53ef1
    //route to retrieve all users for dev purposes. THIS SHOULD NOT BE IN PRODUCTION
    app.get("/api/users", function (req, res) {
        Account.find().then(function (allUsers) {
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

    //route to retrieve all quests for a single account
    app.get("/api/quests/:id", function (req, res) {
        Quest.find({ acctId: req.params.id })
            .populate('acctId')
            .then(function (quests) {
                res.json(quests);
            })
            .catch(function (error) {
                res.jason({ error: error });
            });
    });

    //==================================================
    //================  Post Routes  ===================
    //================================================== 

    
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

    //route to create quests
    app.post('/api/quests', function (req, res) {
        Quest.create(req.body)
            .then(function (quest) {
                res.json(quest);
            })
            .catch(function (err) {
                res.json(err);
            });
    });

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
    // For DEV purpose I need an account ID for adding family members and quests
    // in order to setItem/getItem in localStorage, need this route to create an entry in Account
    //SHOULD REMOVE ONCE THE LOGIN AUTHENTICATION IS UP
    app.post('/api/accounts', function (req, res) {
        Account.create(req.body)
            .then(function (account) {
                res.json(account);
            })
            .catch(function (err) {
                res.jason({ err: err })
            });
    });

   
};