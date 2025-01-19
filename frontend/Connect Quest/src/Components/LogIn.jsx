import React from "react";
import { useNavigate } from "react-router-dom";
import "./LogIn.css";

export default function LogIn() {
  const navigate = useNavigate();

  const handleLogInClick = () => {
    navigate("/challenges");
  };

  return (
    <div id="logInDiv">
      <button className="buttons" onClick={handleLogInClick}>
        Log in
      </button>
      <button className="buttons">Sign up</button>
    </div>
  );
}
