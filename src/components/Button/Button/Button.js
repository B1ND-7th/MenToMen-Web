import React from "react";
import "./Button.css";

function Button({ label, disabled }) {
  return (
    <button
      onClick={() => {
        window.location =
          "http://dauth.b1nd.com/login?client_id=39bc523458c14eb987b7b16175426a31a9f105b7f5814f1f9eca7d454bd23c73&redirect_uri=http://localhost:3000/callback";
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
