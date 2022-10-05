import React, { useEffect, useState } from "react";
import "../Start/StartNav.css";
import Logo from "../../../img/Logo.png";
import { useLocation, useNavigate } from "react-router-dom";
// import accessToken from "../Start/Navbar";
import { ACCESS_KEY, REFRESH_KEY } from "../../../constants/auth/auth.constant";

function StartNav() {
  const navigate = useNavigate();
  // const [token, setToken] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    localStorage.getItem(ACCESS_KEY) ? setIsLogin(true) : setIsLogin(false);
  }, []);

  return (
    <nav className="test">
      <div className="nav">
        <div className="navList">
          <img
            onClick={() => {
              return isLogin ? navigate("/list") : undefined;
            }}
            className="logo"
            alt=""
            src={Logo}
          />

          {isLogin ? (
            <div className="Bt">
              <h2
                className="RequestBt"
                onClick={() => {
                  navigate("/form");
                }}
              >
                멘토요청하기
              </h2>
              <h2 className="MyPage" onClick={() => navigate("/mypage")}>
                마이페이지
              </h2>
              <h2
                className="LogOut"
                onClick={() => {
                  localStorage.removeItem(ACCESS_KEY);
                  localStorage.removeItem(REFRESH_KEY);
                  navigate("/");
                  window.location.reload();
                }}
              >
                로그아웃
              </h2>
            </div>
          ) : (
            <div>
              <h1 onClick={() => navigate("/introduce")}>서비스 소개</h1>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default StartNav;
