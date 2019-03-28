import React from "react";

const alertText = type => {
  let text = "";
  switch (type) {
    case "Password Mismatch":
      text = "Passwords do not match. Please correct and try again.";
      break;
    case "Registration Failed":
      text = "Registration failed. Must register a valid email address.";
      break;
    case "Existing User":
      text = "Registration failed. Account exists for this email address.";
      break;
    case "Login Failed":
      text = "Email or Password is incorrect. Please try again.";
      break;
    case "Missing Info":
      text = "Please fill in all information to Register";
      break;
    default:
      text = "";
  }
  window.scrollTo(0, 0);
  return text;
};

const Alert = props => {
  return <div className="alert alert-danger">{alertText(props.alert)}</div>;
};

export default Alert;
