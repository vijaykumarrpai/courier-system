const Validator = require("validator")
const isEmpty = require("is-empty")

module.exports = function validateRegisterInput(data) {
    let errors = {};

    // Convert empty fields to an empty string so we can use validator functions
       data.name =! isEmpty(data.name) ? data.name : "";
       data.emailId =! isEmpty(data.emailId) ? data.emailId : "";
       data.mobNumber =! isEmpty(data.mobNumber) ? data.mobNumber : "";
       data.password =! isEmpty(data.password) ? data.password : "";
       data.confpassword =! isEmpty(data.confpassword) ? data.confpassword : "";
       data.Address =! isEmpty(data.Address) ? data.Address : "";
       data.location =! isEmpty(data.location) ? data.location : "";

    //Name check
    if(Validator.isEmpty(data.name)) {
        errors.name = "Name field required";
    }

    // Email checks
    if (Validator.isEmpty(data.emailId)) {
        errors.emailId = "Email field is required";
    } else if (!Validator.isEmail(data.emailId)) {
        errors.emailId = "Email is invalid";
    }

    //Mobile Number check
    if(Validator.isEmpty(data.mobNumber)) {
        errors.name = "Mobile Number field required";
    }

    // Password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }

    if (Validator.isEmpty(data.confpassword)) {
        errors.confpassword = "Confirm password field is required";
    }

    if(!validation.equals(password, confpassword)) {
        errors.confpassword = "Password doesn't match";
    }

    // Address checks
    if (Validator.isEmpty(data.Address)) {
        errors.Address = "Password field is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
      };

}