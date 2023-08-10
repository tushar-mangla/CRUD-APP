import React from "react";
import "../css/LoginChoice.css";

const LoginChoice = ({ selectedOption, onOptionChange }) => {
  return (
    <div className="row">
      <div className="col text-start">
        <span
          className={`choice ${selectedOption === "email" ? "active" : ""}`}
          onClick={() => onOptionChange("email")}
        >
          Email
        </span>
      </div>
      <div className="col">
        <span
          className={`choice ${selectedOption === "phone" ? "active" : ""}`}
          onClick={() =>
            onOptionChange(selectedOption === "email" ? "phone" : "email")
          }
        />
      </div>
      <div className="col text-end">
        <span
          className={`choice ${selectedOption === "phone" ? "active" : ""}`}
          onClick={() => onOptionChange("phone")}
        >
          Phone
        </span>
      </div>
    </div>
  );
};

export default LoginChoice;
