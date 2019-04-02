const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

// Convert empty fields to an empty string so we can use validator functions
  data.emailId = !isEmpty(data.emailId) ? data.emailId : "";
  data.passwordId = !isEmpty(data.password) ? data.password : "";

// Email checks
  if (Validator.isEmpty(data.emailId)) {
    errors.emailId = "Email field is required";
  } else if (!Validator.isEmail(data.emailId)) {
    errors.emailId = "Email is invalid";
  }

// Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

return {
    errors,
    isValid: isEmpty(errors)
  };
};