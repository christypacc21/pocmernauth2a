const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport"); //star - need to use passport here + config

const users = require('./routes/api/users'); //star - import the routes here + define base url

// DB Config
const db = require("./config/keys").mongoURI;

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(
    db,
    { userNewUrlParser: true}
  )
  .then(() => console.log("MongoDB succesfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport); // ?is it better to move the require logic to the top

// Routes
app.use('/api/users', users);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there

app.listen(port, () => {
  console.log( `Server up and running on port ${port}`)
})