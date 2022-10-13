import React, { useEffect, useState } from "react";
import "../Start/StartNav.css";
import Logo from "../../../img/Logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { ACCESS_KEY, REFRESH_KEY } from "../../../constants/auth/auth.constant";
import search from "../../../img/search.png";
import { searchPost } from "../../../api/search/Search.api";
import { listState } from "../../../recoil/listAtom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { customAxios } from "../../../lib/axios/customAxios";
import { userStateAtom } from "../../../recoil/userAtom";

function StartNav() {
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
            src={Logo}
          />
          {isLogin ? (
            <>
              {location.pathname === "/list" ? (
                <div className="searchBox">
                  <img src={search} className="searchImg" alt="" />
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
