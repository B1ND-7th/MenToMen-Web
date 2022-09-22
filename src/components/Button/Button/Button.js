import React from "react";
import "./Button.css";
import config from "../../../config.json";
import { ACCESS_KEY } from "../../../constants/auth/auth.constant";
import { navigate, useNavigate } from "react-router-dom";

function Button({ label, disabled }) {
  const navigate = useNavigate();
  let authUrl = `http://dauth.b1nd.com/login?client_id=${config.CLIENTID}&redirect_uri=http://localhost:3000/callback`;

  return (
    <button
      onClick={() => { 
        return !localStorage.getItem(ACCESS_KEY) ?
        window.location = authUrl : navigate("/list")
      }}
      className="startBtn"
      disabled={disabled}
    >
      {label}
      <h1>멘투멘 시작하기</h1>
    </button>
  );
}

export default Button;
