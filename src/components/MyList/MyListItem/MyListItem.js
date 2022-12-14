import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userStateAtom } from "../../../recoil/userAtom";
import { postAtom } from "../../../recoil/uploadAtom";
import bar from "../../../img/bar.svg";
import darkbar from "../../../img/darkbar.svg";
import { useNavigate } from "react-router-dom";
import { customAxios } from "../../../lib/axios/customAxios";
import usePostModal from "../../../Hooks/usePostModal";
import Modal from "../../Modal/Modal";
import { EditPost } from "../../../api/Edit.api";
import { detailDate } from "../../common/Date";
import CommentBt from "../../../img/CommentBt.png";
import DarkCommentBt from "../../../img/darkcoment.png";
import Slider from "react-slick";
import Design from "../../../img/Design.svg";
import Web from "../../../img/Web1.svg";
import Android from "../../../img/Android.svg";
import Ios from "../../../img/Ios.svg";
import Server from "../../../img/Server.svg";
import useDarkMode from "use-dark-mode";
import { useParams } from "react-router-dom";
import profile from "../../../img/profile.png";

const MyListItem = ({ data }) => {
  const currentMode = useDarkMode(localStorage.getItem("darkMode"));
  const [modal, setModal] = useState(false);
  const { isModify, onChangeModify, setIsModify } = usePostModal();
  const [postData, setPostData] = useState(data);
  const [postId, setPostId] = useRecoilState(postAtom);
  const navigate = useNavigate();
  const nowDate = detailDate(new Date(data.createDateTime));
  const userData = useRecoilValue(userStateAtom);
  const [tempText, setTempText] = useState("");
  // const { postId } = useParams();

  const onClick = () => {
    setPostId(data.postId);
    navigate(`/comment/${data.postId}`);
  };

  const editText = async () => {
    const data = {
      content: tempText,
      imgUrls: postData.imgUrls ? postData.imgUrls : [],
      postId: postData.postId,
      tag: postData.tag,
    };
    try {
      const res = await customAxios.patch("/post/update", data);
      setIsModify(false);
      setPostData((prev) => ({ ...prev, content: tempText }));
    } catch (error) {
      console.log(error);
    }
  };

  const changeTagColor = () => {
    switch (data.tag) {
      case "WEB":
        return Web;
      case "DESIGN":
        return Design;
      case "SERVER":
        return Server;
      case "ANDROID":
        return Android;
      case "IOS":
        return Ios;
      default:
        break;
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="formSection">
      <div className="leftSection">
        <div className="profile">
          <div className="profileUrl">
            {/* {data.profileUrl ? (
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
            )} */}
            <img src={profile} className="profileUrl" />
          </div>
          <div className="nameTag">
            <div className="userName">{data.userName}</div>
            <p className="tag">
              {`${data?.stdInfo.grade}?????? ${data?.stdInfo.room}??? ${data?.stdInfo.number}??? `}
            </p>
          </div>
          <div className="date">{nowDate}</div>
        </div>
        {isModify ? (
          <textarea
            value={tempText}
            onChange={(e) => {
              setTempText(e.target.value);
            }}
            onKeyDown={async (e) => {
              if (e.key === "Enter") {
                console.log("enter");
                await editText();
                postData.content = "";
              }
            }}
          />
        ) : (
          <p className="contentSection">{postData.content}</p>
        )}
        <img
          className="able"
          src={currentMode.value === true ? DarkCommentBt : CommentBt}
          alt={""}
          onClick={onClick}
        />
      </div>
      <div className="ListItemImgBox">
        {data.imgUrls && (
          <Slider {...settings}>
            {data.imgUrls.map((item) => {
              return (
                <div className="ListItemImg">
                  <img src={item} className="listImage" alt={"listItem img"} />
                </div>
              );
            })}
          </Slider>
        )}
      </div>
      <div className="modalBarWrap">
        <img className="tagImg" alt="" src={changeTagColor()} />
        {userData.userId === data.author ? (
          <img
            src={currentMode.value === true ? darkbar : bar}
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
    </div>
  );
};

export default MyListItem;
