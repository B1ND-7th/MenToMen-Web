import React from "react";
import { useNavigate } from "react-router-dom";

function Nav() {
  let navigate = useNavigate();
  return (
    <span
      onClick={() => {
        navigate("/auth");
      }}
    >
      Auth페이지로 이동하기
    </span>
  );
}

export default Nav;
