import React from "react";
import "./Sidebar.css";
import profileimg from "../../img/aprofile.png";
import { postAtom } from "../../recoil/uploadAtom";
import { useRecoilState } from "recoil";
import { useState } from "react";

export default function Sidebar({}) {
  const [post, setPost] = useState();

  return (
    <div className="SideBarBox">
      <div className="SideBar">
        {/* <div className="ProfileUrl">
          {data.profileUrl ? (
            <img
              src={data.profileUrl}
              className="profileUrl"
              alt={"listItem profile"}
            />
          ) : (
            <img src={profileimg} alt="img" className="ProfileUrl" />
          )}
        </div> */}
      </div>
    </div>
  );
}
