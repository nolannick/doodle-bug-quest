import React from "react";
import bug from "../rolypolyimage1.jpg";

const ErrorPage = () => {
  return (
    <div className="Bugs center">
      <h2>You have wandered off course. <a href= "/family">Return Home</a></h2>
      <img src={bug} alt= "errorBug"id="errorImage" />
      
    </div>
  );
};
export default ErrorPage;
