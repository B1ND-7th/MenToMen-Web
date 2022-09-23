import React, { useEffect, useState } from "react";
import "../Start/StartNav.css";
import Logo from "../../../img/Logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { ACCESS_KEY } from "../../../constants/auth/auth.constant";
// import accessToken from "../Start/Navbar";

function StartNav() {
  const navigate = useNavigate();
  // const [token, setToken] = useState("");
  const location  = useLocation();
  const [isLogin, setIsLogin] = useState(false);

 

  useEffect(()=>{
    if(localStorage.getItem(ACCESS_KEY)) {
      setIsLogin(true);
      return;
    }

    setIsLogin(false);

  },[location])

  return (
    <nav className="test">
      <div className="nav">
        <div className="navList">
      
        <img onClick={() => {return isLogin ?(navigate("/list")) : undefined}} className="logo" alt=""src={Logo}/>

          {isLogin ? 
              <div className="Bt">
                <h2 className="RequestBt" onClick={() => {navigate("/form")}}>멘토요청하기</h2>
                <h2 className="MyPage">마이페이지</h2>
              </div> 
          :
              <div> 
                <h1>서비스 소개</h1>
              </div>
            }
           
      
        </div> 
      </div>
    </nav>
  );
}

export default StartNav;

        