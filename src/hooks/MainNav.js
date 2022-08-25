import React from "react";
import { useNavigate } from "react-router-dom";

function Nav() {
  let navigate = useNavigate();
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
