import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Nav() {
  let navigate = useNavigate();

  const request = async () => {
    try {
      await axios.get("http://10.80.162.200:8080/user/my", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
    } catch (error) {
      navigate("/auth");
    }
  };

  useEffect(() => {
    request();
  }, []);

  return (
    <div className="Nav">
      <p className="Logo">멘투맨</p>
      <p className="Service">서비스 소개</p>
      <p className="rhrortkfP">고객 사례</p>
      <p className="FAQ">FAQ</p>
      <p
        className="login"
        onClick={() => {
          navigate("/auth");
        }}
      >
        로그인
      </p>
    </div>
  );
}

export default Nav;
