import React from "react";
import "./StartNav.css";
import logo from "../../img/Logo.png";
import { useNavigate } from "react-router-dom";

function StartNav() {
  const navigate = useNavigate();

  return (
    <nav className="test">
      <div className="nav">
        <div className="navList">
          <img
            onClick={() => {
              navigate("/");
            }}
            className="logo"
            alt=""
            src={logo}
          />
          <h1
            onClick={() => {
              navigate("/Introduce");
            }}
          >
            서비스 소개
          </h1>
        </div>
      </div>
    </nav>
  );
}

export default StartNav;
