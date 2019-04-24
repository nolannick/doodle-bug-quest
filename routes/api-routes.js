const Account = require("../models/Account");
const hash = require("../hash");
const jwt = require("jsonwebtoken");
const Gif = require("../models/Gifs");
const checkAuth = require("../checkAuth");
const FamilyMember = require("../models/FamilyMembers");
const Quest = require("../models/Quest");
const Reward = require("../models/Reward");
const ResetPassword = require("../models/PasswordResetAttempts");

//verifies Token
const verifyToken = function(req, res, next) {
  //   const bearerHeader = token;
  const bearerHeader = req.headers.authorization;
  // Check if bearer is undefined
  if (typeof bearerHeader !== undefined) {
    req.token = bearerHeader;
    // Next middleware
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = function(app) {
  //==================================================
  //================  REGISTER/LOGIN  ================
  //==================================================

  //route to register
  app.post("/api/users/registration", function(req, res) {
    Account.find({ username: req.body.username }).then(user => {
      if (!user[0]) {
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
      } else {
        res.json({ error: "User already exists" });
      }
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
            { expiresIn: "30d" },
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

  //Route to Create Password Reset Request

  app.post("/api/resetPasswordAttempt", function(req, res) {
    Account.find({ username: req.body.username }).then(user => {
      if (user[0]) {
        const newGuid = hash.encrypt(req.body.guid, "a");
        const resetRequest = {
          username: req.body.username,
          guid: newGuid
        };
        ResetPassword.create(resetRequest)
          .then(function(newReq) {
            res.json(newReq);
          })
          .catch(function(error) {
            res.json({ error: error });
          });
      } else {
        res.json({ error: "User does not exist" });
      }
    });
  });

  //Route to reset password

  app.post('/api/passwordreset/:guid', function (req, res) {
    const newGuid = hash.encrypt(req.params.guid, "a")
    ResetPassword.findOne({guid: newGuid}, {}, {sort: { 'created_at' : -1 } }).then(record => {
      if (record) {
        const salt = hash.generateSalt();
        const newPassword = hash.encrypt(req.body.password, salt);
        Account.findOneAndUpdate({username: record.username}, { $set: {password: newPassword, salt: salt}})
        .then(complete => {
          res.json('success, yay');
        }) 
      } else {
        res.json('Invalid attempt');
      }
    });
  });

  //-------------Data Retrieval Routes.  -------------------
  //route to retrieve a profile by userId. THIS IS AN EXAMPLE OF HOW WE SHOULD QUERY WTH TOKEN.
  //This needs to be replaced with a valid route once other models are created.
  app.get("/api/users/:userId", verifyToken, checkAuth, function(req, res) {
    Account.findById(req.params.userId)
      .then(function(user) {
        res.json(user);
      })
      .catch(function(error) {
        res.json({ error: error });
        window.location.href = "/";
      });
  });

  app.get("/api/users", function(req, res) {
    Account.find().then(function(users) {
      res.json(users);
    });
  });

  //==================================================
  //================  GET Routes  ====================
  //==================================================

  //route to retrieve all family members for a single account
  app.get("/api/familyMembers/:id", verifyToken, checkAuth, function(req, res) {
    FamilyMember.find({ acctId: req.params.id })
      .populate("acctId")
      .then(function(members) {
        res.json(members);
      })
      .catch(function(error) {
        res.jason({ error: error });
        window.location.href = "/";
      });
  });

  //route to retrieve all family members based on doodblebugBucks count for an account
  app.get(
    "/api/familyMembers/eligible/:amount/:id",
    verifyToken,
    checkAuth,
    function(req, res) {
      FamilyMember.find({
        acctId: req.params.id,
        doodlebugBucks: { $gte: req.params.amount }
      })
        .populate("acctId")
        .then(function(members) {
          res.json(members);
        })
        .catch(function(error) {
          res.jason({ error: error });
          window.location.href = "/";
        });
    }
  );

  //route to retrieve a single family member by Id
  app.get(
    "/api/familyMembers/familyMember/:id",
    verifyToken,
    checkAuth,
    function(req, res) {
      FamilyMember.find({ _id: req.params.id })
        .populate("acctId")
        .then(function(member) {
          res.json(member);
        })
        .catch(function(error) {
          res.jason({ error: error });
          window.location.href = "/";
        });
    }
  );

  //route to retrieve all quests for a single account
  app.get("/api/quests/:id", verifyToken, checkAuth, function(req, res) {
    Quest.find({ acctId: req.params.id, show: true })
      .populate("acctId")
      .then(function(quests) {
        res.json(quests);
      })
      .catch(function(error) {
        res.jason({ error: error });
        window.location.href = "/";
      });
  });

  //route to retrieve individual quest by questId
  app.get("/api/quests/quest/:id", verifyToken, checkAuth, function(req, res) {
    Quest.find({ _id: req.params.id })
      .then(function(quest) {
        res.json(quest);
      })
      .catch(function(error) {
        res.jason({ error: error });
        window.location.href = "/";
      });
  });

  //route to retrieve all rewards for a single account
  app.get("/api/rewards/:id", verifyToken, checkAuth, function(req, res) {
    Reward.find({ acctId: req.params.id, show: true })
      .populate("acctId")
      .then(function(rewards) {
        res.json(rewards);
      })
      .catch(function(error) {
        res.jason({ error: error });
        window.location.href = "/";
      });
  });

  //route to retrieve individual reward by rewardId
  app.get("/api/rewards/reward/:id", verifyToken, checkAuth, function(
    req,
    res
  ) {
    Reward.find({ _id: req.params.id })
      .then(function(reward) {
        res.json(reward);
      })
      .catch(function(error) {
        res.jason({ error: error });
        window.location.href = "/";
      });
  });

  //==================================================
  //================  POST Routes  ===================
  //==================================================

  //route to create family members
  app.post("/api/familyMembers", verifyToken, checkAuth, function(req, res) {
    FamilyMember.create(req.body)
      .then(function(member) {
        res.json(member);
      })
      .catch(function(err) {
        res.json(err);
        window.location.href = "/";
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
        window.location.href = "/";
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
        window.location.href = "/";
      });
  });

  //==================================================
  //================  PUT Routes  ===================
  //==================================================

  //Route to update family member
  app.put(
    "/api/familyMembers/familyMember/:id",
    verifyToken,
    checkAuth,
    function(req, res) {
      const val = req.body.doodlebugBucks;
      const reward = req.body.rewardId;
      const quest = req.body.questId;
      FamilyMember.findByIdAndUpdate(
        { _id: req.params.id },
        {
          $inc: { doodlebugBucks: val },
          $push: { rewards: reward, quests: quest }
        }
      )
        .then(function(res) {
          console.log(res);
          res.json({ message: "User has been successfully updated" });
        })
        .catch(function(err) {
          res.json(err);
          // window.location.href = "/";
        });
    }
  );

  //Route to update reward
  app.put("/api/rewards/reward/:id", verifyToken, checkAuth, function(
    req,
    res
  ) {
    Reward.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body })
      .then(function(res) {
        // console.log(res);
        res.json({ message: "Reward has been successfully updated" });
      })
      .catch(function(err) {
        res.json(err);
        window.location.href = "/";
      });
  });

  //Route to update quest
  app.put("/api/quests/quest/:id", verifyToken, checkAuth, function(req, res) {
    Reward.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body })
      .then(function(res) {
        // console.log(res);
        res.json({ message: "Reward has been successfully updated" });
      })
      .catch(function(err) {
        res.json(err);
        window.location.href = "/";
      });
  });

  //==================================================
  //=================  GIFS Routes  ==================
  //==================================================

  app.post("/api/gifs", function(req, res) {
    Gif.insertMany(req.body)
      .then(function(newGif) {
        res.json(newGif);
      })
      .catch(function(error) {
        res.json({ error: error });
      });
  });

  //Returns 1 random Gif document
  app.get("/api/gifs", function(req, res) {
    Gif.count().exec(function(err, count) {
      // Get a random entry
      var random = Math.floor(Math.random() * count);

      // Again query all gifs but only fetch one offset by our random #
      Gif.findOne()
        .skip(random)
        .exec(function(err, result) {
          // Tada! random gif
          res.json(result);
        });
    });
  });

  //==================================================
  //=================  DELETE Routes  ===================
  //==================================================

  //route to delete reward - NOTE: Doesn't actaully delete - just removes from view
  app.delete("/api/rewards/reward/:id", verifyToken, checkAuth, function(
    req,
    res
  ) {
    Reward.findByIdAndUpdate({ _id: req.params.id }, { $set: { show: false } })
      .then(function(res) {
        // console.log(res);
        res.json({ message: "Reward has been successfully updated" });
      })
      .catch(function(err) {
        res.json(err);
        window.location.href = "/";
      });
  });

  //route to delete quest - NOTE: Doesn't actaully delete - just removes from view
  app.delete("/api/quests/quest/:id", verifyToken, checkAuth, function(
    req,
    res
  ) {
    Quest.findByIdAndUpdate({ _id: req.params.id }, { $set: { show: false } })
      .then(function(res) {
        // console.log(res);
        res.json({ message: "Reward has been successfully updated" });
      })
      .catch(function(err) {
        res.json(err);
        window.location.href = "/";
      });
  });

  //==================================================
  //=================  Alexa Routes  ===================
  //==================================================

  app.get("/api/familyMembers", function(req, res) {
    FamilyMember.findById("5c9e336172fadb002a09bb15")
      .populate("acctId")
      .then(function(member) {
        res.json(member);
      })
      .catch(function(error) {
        res.jason({ error: error });
      });
  });
};
