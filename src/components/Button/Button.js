import React from "react";
import "./Button.css";
import config from "../config.json";

function Button({ label, disabled }) {
  let authUrl = `http://dauth.b1nd.com/login?client_id=${config.CLIENTID}&redirect_uri=http://localhost:3000/callback`;

  return (
    <button
      onClick={() => {
        window.location = authUrl;
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
