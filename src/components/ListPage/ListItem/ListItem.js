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

const FeedMenuModal = ({ data }) => {
  const [postId, setPostId] = useRecoilState(postAtom);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const userData = useRecoilValue(userStateAtom);
  const [postData, setPostData] = useState(data);
  const { isModify, onChangeModify } = usePostModal();
  const [input, setInput] = useState("");

  const detailDate = (a) => {
    const milliSeconds = new Date() - a;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  };

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
