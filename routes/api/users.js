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

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  const { name, email, password } = req.body;
  // Check Validation - if valid -> check user exist or not -> if not exist, can hash and save user into db
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already Exists" });
      }
      const newUser = new User({
        name,
        email,
        password
      });

      // Hash password before saving in database (gen salt using bcrypt(then hash), (any error throw error), use the hash to replace pw, then save user)
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err)); // when hv error, how to decide if we console.log or json(err)?
        });
      });
    });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", ( req, res ) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation 
  // - if valid -> check if user exists,(if not, return 400 with the error object we defined) 
  // - if exist -> check if pw match(user bcrypt compare) (if not -> return 400 email not found), 
  // - if match -> response with (signed) JWT (if not -> return400 pwincorrect )
  if(!isValid){
    return res.status(400).json(errors); // errors are defined by us in validateLoginInput
  }

  const { email, password } = req.body;
  // Find user by email
  User.findOne({ email }).then(user => {

    // Check if user exists
    if (!user) {
      return res.status(400).json({ emailnotfound: "email not found" });
    }

    // Check password
                // if(password!==user.password){ // no, u needa use bcrypt compare
                //   return 
                // }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT payload //star 
        const payload = {
          id: user.id,
          name: user.name
        };

    // Sign token //star
        jwt.sign( // ?no need include JWT header part
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
          .json({ passwordincorrect: 'Password incorrect' });
      }
    });
  });
});

module.exports = router;