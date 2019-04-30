const Validator = require("validator");
const isEmpty = require("is-empty")  // I suspect we dun need this helper dependency, exceot for the last return sentence
// import isEmpty from 'is-empty';

module.exports = function validateRegisterInput({name, email, password, password2}) {
  let errors = {}; // for 砌 response(eg 400) geh error json object

  // change all empty fields into string for validator
  name = name ? name : '';
  email = email ? email : '';
  password = password ? password : '';
  password2 = password2 ? password2 : '';
  // name = !isEmpty(name) ? name : "";
  // email = !isEmpty(email) ? email : "";
  // password = !isEmpty(password) ? password : "";
  // password2 = !isEmpty(password2) ? password2 : "";

  // Validate the fields

  // Name checks- isEmpty
  // Validator.isEmpty(name) ? error.name="Name field is required" : ''; // as we are creating a function, we dun need ter.op ? // ng g if we can write like this
  if(Validator.isEmpty(name)){
    errors.name = "Name is required"
  }

  // Email checks- isEmpty, isEmail
  if(Validator.isEmpty(email)){
    errors.email = "Email is required"
  } else if (!Validator.isEmail(email)) { // why use else if here
    errors.email = "Email is invalid";
  }

  // password1 checks - isEmpty , length
  if(Validator.isEmpty(password)){
    errors.password = "Password is required";
  }
  if(!Validator.isLength(password, {min:6, max: 30})){ // why not use else if here
    errors.password = "Password length must be from 6 to 30"
  }

  // password2 checks - isEqual(password)
  if(Validator.isEmpty(password2)){
    errors.password = "Password Confirmation is required";
  }
  if(!Validator.equals(password, password2)){
    errors.password2 = "Passwords must match"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}


// must declare a variable to hold the values in order to mutate the value, can't:
// name ? name : '';
// email ? email : '';
// password ? password : '';
// password2 ? password2 : '';