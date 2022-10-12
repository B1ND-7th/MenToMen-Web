import React, { useEffect, useState } from "react";
import "./Listitem.css";
import talk from "../../../img/talk.png";
import bar from "../../../img/bar.svg";
import { userStateAtom } from "../../../recoil/userAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { customAxios } from "../../../lib/axios/customAxios";
import { useNavigate } from "react-router-dom";
import { postAtom } from "../../../recoil/uploadAtom";
import Modal from "../../Modal/Modal";
import usePostModal from "../../../Hooks/usePostModal";
import { EditPost } from "../../../api/Edit.api";
import { detailDate } from "../../common/Date";

const FeedMenuModal = ({ data }) => {
  const [postId, setPostId] = useRecoilState(postAtom);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const userData = useRecoilValue(userStateAtom);
  const [postData, setPostData] = useState(data);
  const { isModify, onChangeModify } = usePostModal();
  const [input, setInput] = useState("");

  const nowDate = detailDate(new Date(data.createDateTime));

  const onClick = () => {
    setPostId(data.postId);
    navigate("/comment");
  };

  const changeTagColor = () => {
    switch (data.tag) {
      case "WEB":
        return "#D38D42";
      case "DESIGN":
        return "#D83F67";
      case "SERVER":
        return "#3E89DB";
      case "ANDROID":
        return "#35C174";
      case "IOS":
        return "#4C4C4C";
      default:
        break;
    }
  };

  return (
    <div className="formSection">
      <div className="leftSection">
        <div className="profile">
          <div className="profileUrl">
            {data.profileUrl ? (
              <img
                src={data.profileUrl}
                className="profileUrl"
                alt={"listItem profile"}
              />
            ) : (
              <img
                src="http://dodam.b1nd.com/static/media/profile.9a3a77b0.svg"
                alt="img"
              />
            )}
          </div>
          <div className="nameTag">
            <div className="userName">{data.userName}</div>
            <div
              className="tagbox"
              style={{
                border: `1px solid ${changeTagColor()}`,
                color: `${changeTagColor()}`,
              }}
            >
              <div className="tag">{data.tag}</div>
            </div>
          </div>
          <div className="date">{nowDate}</div>
          {userData.userId === data.author ? (
            <img
              src={bar}
              className="trashImg"
              alt=""
              onClick={() => setModal(!modal)}
            />
          ) : null}
          {modal === true ? (
            <Modal
              data={data}
              className="modal"
              isModify={isModify}
              onChangeModify={onChangeModify}
            />
          ) : null}
        </div>
        {isModify ? (
          <textarea
            value={postData.content}
            onChange={(e) => {
              setPostData((prev) => ({ ...prev, content: e.target.value }));
            }}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                await EditPost(postData);
                postData.content = "";
                window.location.reload();
              }
            }}
          />
        ) : (
          <p className="contentSection">{data.content}</p>
        )}
        <img className="able" src={talk} alt={""} onClick={onClick} />
      </div>
      <div className="imgUrl">
        {data.imgUrls && (
          <img
            src={data.imgUrls[0]}
            className="imgUrl"
            alt={"listItem img"}
            onClick={onClick}
          />
        )}
      </div>
    </div>
  );
};

export default FeedMenuModal;
