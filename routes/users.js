var express = require("express");
var router = express.Router();
const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const saltRounds = 10;

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("fisk");
});

router.post("/log-in-user", function (req, res, next) {
  let findUser = async () => {
    let found = await User.find({ email: req.body.email });
    return found;
  };

  let found = findUser();
  found.then((data) => {
    if (data.length == 0) {
      res.send(false);
    } else {
      if (bcrypt.compareSync(req.body.passWord, data[0].passWord)) {
        data[0].passWord = undefined;

        res.send(data);
      } else {
        res.send(false);
      }
    }
  });
});

router.post("/new-user", function (req, res, next) {
  let findUser = async () => {
    let found = await User.find({ email: req.body.email });
    return found;
  };

  let found = findUser();
  found.then((data) => {
    if (data.length != 0) {
      res.send(false);
    } else {
      let newUser = new User();
      let passHash = bcrypt.hashSync(req.body.passWord, saltRounds);

      newUser.email = req.body.email;
      newUser.passWord = passHash;
      newUser.userName = req.body.userName;
      newUser.userid = uuidv4();
      newUser.todos = [
        {
          name: "My Todos",
          todos: ["Clean the bathroom", "Do the laundry", "Cook dinner"],
        },
      ];

      newUser
        .save()
        .then((result) => {
          result.passWord = undefined;
          res.send(result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
});

module.exports = router;
