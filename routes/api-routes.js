const Account = require("../models/Account");
const hash = require("../hash");
const jwt = require("jsonwebtoken");
const checkAuth = require("../checkAuth");
const FamilyMember = require("../models/FamilyMembers");
const Quest = require("../models/Quest");
const Reward = require('../models/Reward')

//verifies Token
const verifyToken = function(req, res, next) {
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
  } else {
    res.sendStatus(403);
  }
};

module.exports = function(app) {
  //-------------routes to register/login-------------

  //route to register
  app.post("/api/users/registration", function(req, res) {
    const salt = hash.generateSalt();
    const newPassword = hash.encrypt(req.body.password, salt);
    const user = {
      username: req.body.username,
      password: newPassword,
      familyname: req.body.familyname,
      salt: salt
    };
    Account.create(user)
      .then(function(newUser) {
        res.json(newUser);
      })
      .catch(function(error) {
        res.json({ error: error });
      });
  });

  //route to login
  app.post("/api/users/session", function(req, res) {
    Account.findOne({ username: req.body.username })
      .then(function(user) {
        const passwordCheck = hash.encrypt(req.body.password, user.salt);
        if (user.password === passwordCheck) {
          const verifiedUser = {
            acct_id: user._id,
            famName: user.familyname
          };
          jwt.sign(
            verifiedUser,
            process.env.JWT_KEY,
            { expiresIn: "3h" },
            function(err, token) {
              res.json({ verifiedUser, token });
            }
          );
        } else {
          res.json("Wrong Password");
        }
      })
      .catch(function(error) {
        res.json({ error: error });
      });
  });

  //-------------Data Retrieval Routes.  -------------------
  //route to retrieve a profile by userId. THIS IS AN EXAMPLE OF HOW WE SHOULD QUERY WTH TOKEN.
  //This needs to be replaced with a valid route once other models are created.
  app.get("/api/account/:Id", verifyToken, checkAuth, function(req, res) {
    Account.findById(req.params.userId)
      .then(function(user) {
        res.json(user);
      })
      .catch(function(error) {
        res.json({ error: error });
      });
  });

  //route to retrieve all users for dev purposes. THIS SHOULD NOT BE IN PRODUCTION
  app.get("/api/users", function(req, res) {
    Account.find()
      .then(function(allUsers) {
        res.json(allUsers);
      })
      .catch(function(error) {
        res.jason({ error: error });
      });
  });

  //route to retrieve all family members for a single account
  app.get("/api/familyMembers/:id", verifyToken, checkAuth, function(req, res) {
    FamilyMember.find({ acctId: req.params.id })
      .populate("acctId")
      .then(function(members) {
        res.json(members);
      })
      .catch(function(error) {
        res.jason({ error: error });
      });
  });

  //route to retrieve a single family member by Id
  app.get("/api/familyMembers/familyMember:id", verifyToken, checkAuth, function(req, res) {
    FamilyMember.find({ _Id: req.params.id })
      .populate("acctId")
      .then(function(member) {
        res.json(member);
      })
      .catch(function(error) {
        res.jason({ error: error });
      });
  });

  //route to retrieve all quests for a single account
  app.get("/api/quests/:id", verifyToken, checkAuth, function(req, res) {
    Quest.find({ acctId: req.params.id })
      .populate("acctId")
      .then(function(quests) {
        res.json(quests);
      })
      .catch(function(error) {
        res.jason({ error: error });
      });
  });

  //route to retrieve individual quest by questId
  app.get("/api/quests/quest/:id", verifyToken, checkAuth, function(req, res) {
    Quest.find({ _Id: req.params.id })
      .then(function(quest) {
        res.json(quest);
      })
      .catch(function(error) {
        res.jason({ error: error });
      });
  });

  //route to retrieve all rewards for a single account
  app.get("/api/rewards/:id", verifyToken, checkAuth, function(req, res) {
    Reward.find({ acctId: req.params.id })
      .populate("acctId")
      .then(function(rewards) {
        res.json(rewards);
      })
      .catch(function(error) {
        res.jason({ error: error });
      });
  });

  //route to retrieve individual reward by rewardId
  app.get("/api/rewards/reward/:id", verifyToken, checkAuth, function(
    req,
    res
  ) {
    Reward.find({ _Id: req.params.id })
      .then(function(reward) {
        res.json(reward);
      })
      .catch(function(error) {
        res.jason({ error: error });
      });
  });

  //==================================================
  //================  Post Routes  ===================
  //==================================================

  //route to create family members
  app.post("/api/familyMembers", verifyToken, checkAuth, function(req, res) {
    FamilyMember.create(req.body)
      .then(function(member) {
        res.json(member);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  //route to create quests
  app.post("/api/quests", verifyToken, checkAuth, function(req, res) {
    Quest.create(req.body)
      .then(function(quest) {
        res.json(quest);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  //route to create rewards
  app.post("/api/reward", verifyToken, checkAuth, function(req, res) {
    Reward.create(req.body)
      .then(function(reward) {
        res.json(reward);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  //------------------------------
  //--------PUT ROUTES------------
  //------------------------------

  //Route to update family member
  app.put(
    "/api/familyMembers/familyMember/:id",
    verifyToken,
    checkAuth,
    function(req, res) {
      FamilyMember.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: req.body }
      )
        .then(function(res) {
          console.log(res);
          res.json({ message: "User has been successfully updated" });
        })
        .catch(function(err) {
          res.json(err);
        });
    }
  );

  //Route to update reward
  app.put("/api/rewards/reward/:id", verifyToken, checkAuth, function(req, res) {
    Reward.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body })
      .then(function(res) {
        console.log(res);
        res.json({ message: "Reward has been successfully updated" });
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  //Route to update quest
  app.put("/api/quests/quest/:id", verifyToken, checkAuth, function(req, res) {
    Reward.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body })
      .then(function(res) {
        console.log(res);
        res.json({ message: "Reward has been successfully updated" });
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  //------------------------------
  //--------DELETE ROUTES---------
  //------------------------------

  //route to delete reward - NOTE: Doesn't actaully delete - just removes from view
  app.delete("/api/rewards/reward/:id", verifyToken, checkAuth, function(req, res) {
    Reward.findByIdAndUpdate({ _id: req.params.id }, {$set: { show: false }})
      .then(function(res) {
        console.log(res);
        res.json({ message: "Reward has been successfully updated" });
      })
      .catch(function(err) {
        res.json(err);
      });
  });

    //route to delete quest - NOTE: Doesn't actaully delete - just removes from view
    app.delete("/api/quests/quest/:id", verifyToken, checkAuth, function(req, res) {
        Reward.findByIdAndUpdate({ _id: req.params.id }, {$set: { show: false }})
          .then(function(res) {
            console.log(res);
            res.json({ message: "Reward has been successfully updated" });
          })
          .catch(function(err) {
            res.json(err);
          });
      });
};
