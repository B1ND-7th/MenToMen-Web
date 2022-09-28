import React from "react";
import Logo from "../../../img/Logo.png";
import { useNavigate } from "react-router-dom";
import "../Main/MainNav.css";
function MainNav() {
  const navigate = useNavigate();
  return (
    <nav className="test">
      <div className="nav">
        <div className="navList">
          <img
            onClick={() => {
              navigate("/");
            }}
            className="main-logo"
            alt=""
            src={Logo}
          />
          <h1
            className="mento"
            onClick={() => {
              navigate("/form");
            }}
          >
            멘토요청하기
          </h1>
          <h1>마이페이지</h1>
        </div>
      </div>
    </nav>
  );
}

export default MainNav;
