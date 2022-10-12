import React, { useEffect, useState } from "react";
import useFeedMenu from "../../../Hooks/useFeedMenu";
import { useRecoilState, useRecoilValue } from "recoil";
import { userStateAtom } from "../../../recoil/userAtom";
import { postAtom } from "../../../recoil/uploadAtom";
import talk from "../../../img/talk.png";
import bar from "../../../img/bar.svg";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../../../lib/axios/customAxios";
import usePostModal from "../../../Hooks/usePostModal";
import Modal from "../../Modal/Modal";
import { EditPost } from "../../../api/Edit.api";
import { detailDate } from "../../common/Date";

const MyListItem = ({ data }) => {
  const [modal, setModal] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(userStateAtom);
  const { isModify, onChangeModify } = usePostModal();
  const [postData, setPostData] = useState(data);
  const [postId, setPostId] = useRecoilState(postAtom);
  const navigate = useNavigate();
  const nowDate = detailDate(new Date(data.createDateTime));
  const userData = useRecoilValue(userStateAtom);

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
    <>
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
          {data.imgUrl && (
            <img src={data.imgUrl} className="imgUrl" alt={"listItem img"} />
          )}
        </div>
      </div>
    </>
  );
};

export default MyListItem;
