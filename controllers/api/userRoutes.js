//Express required, and router onject created
const express = require("express")
// const router = express.Router()
const router = require("express").Router();
//User model imported from ../../models directory
const { User } = require("../../models");

// CREATE new user record. Sends user data as JSON response. If error, return 500 status
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });


   //Set up sessions with the 'loggedIn' variable
    req.session.save(() => {
      // Set the 'loggedIn' session variable to 'true'

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST route handler. Retrieved user data using User.findOne, checks password checkPassword(), sets up sessions with loggedIn variable
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      // Once the user successfully logs in, set up sessions with the 'loggedIn' variable

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post("/logout", (req, res) => {
  // When the user logs out, the session is destroyed
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
