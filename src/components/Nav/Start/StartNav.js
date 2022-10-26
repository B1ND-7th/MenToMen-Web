import React, { useEffect, useState } from "react";
import "../Start/StartNav.css";
import Logo from "../../../img/Logo.png";
import DarkLogo from "../../../img/DarkLogo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { ACCESS_KEY, REFRESH_KEY } from "../../../constants/auth/auth.constant";
import search from "../../../img/search.png";
import darksearch from "../../../img/darksearch.png";
import { searchPost } from "../../../api/search/Search.api";
import { listState } from "../../../recoil/listAtom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { customAxios } from "../../../lib/axios/customAxios";
import { userStateAtom } from "../../../recoil/userAtom";
import useDarkMode from "use-dark-mode";

function StartNav() {
  const currentMode = useDarkMode(localStorage.getItem("darkMode"));
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(false);
  const [inputText, setInputText] = useState("");
  const setList = useSetRecoilState(listState);
  const [userInfo, setUserInfo] = useRecoilState(userStateAtom);

  useEffect(() => {
    localStorage.getItem(ACCESS_KEY) ? setIsLogin(true) : setIsLogin(false);
  }, []);

  const request = async () => {
    try {
      const { data } = await customAxios.get("/user/my");
      setUserInfo(data.data);
    } catch (error) {
      navigate("/");
    }
  };

  useEffect(() => {
    request();
  }, []);

  return (
    <nav className="test">
      <div className="nav">
        <div className="navList">
          <img
            onClick={() => {
              if (location.pathname === "/list") window.location.reload();
              if (isLogin) navigate("/list");
            }}
            className="logo"
            alt=""
            src={currentMode.value === true ? DarkLogo : Logo}
          />
          {isLogin ? (
            <>
              {location.pathname === "/list" ? (
                <div className="searchBox">
                  <img
                    src={currentMode.value === true ? darksearch : search}
                    className="searchImg"
                    alt=""
                  />
                  <input
                    className="searchInput"
                    placeholder="키워드 검색"
                    value={inputText}
                    onChange={(e) => {
                      setInputText(e.target.value);
                    }}
                    onKeyDown={async (e) => {
                      if (e.key === "Enter") {
                        const { data } = await searchPost(inputText);
                        setList(data);
                        setInputText("");
                      }
                    }}
                  />
                </div>
              ) : null}
              <div className="Bt"></div>
            </>
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
