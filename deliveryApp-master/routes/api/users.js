const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");


router.post("/register", (req, res) => {
    //Form Validation
    const { errors, isValid } = validateRegisterInput(req.body);

    //Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    User.findOne({ emailId: req.body.emailId }).then(user => {
        if (user) {
            return res.status(400).json({ emailId: "EMAIL ALREADY EXISTS" });
        }
    
    const newUser = new User ({
        name: req.body.name,
        emailId: req.body.emailId,
        mobNumber: req.body.mobNumber,
        password: req.body.password,
        confpassword: req.body.confpassword,
        Address: req.body.Address,
        location0: req.body.location0,
        location1: req.body.location1
    })

    // Hash password before saving in database
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    
    })
})


router.post("/login", (req, res) => {
    // Form validation
  
  const { errors, isValid } = validateLoginInput(req.body);
  
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
  const emailId = req.body.emailId;
    const password = req.body.password;
  
  // Find user by email
    User.findOne({ emailId }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            name: user.name
          };
  
  // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });

  module.exports = router;