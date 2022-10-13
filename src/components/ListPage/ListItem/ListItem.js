import React, { useEffect, useState } from "react";
import "./Listitem.css";
import talk from "../../../img/talk.png";
// import Trash from "../../../img/Trash.png";
import useFeedMenu from "../../../Hooks/useFeedMenu";
import { userStateAtom } from "../../../recoil/userAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { customAxios } from "../../../lib/axios/customAxios";
import { useNavigate } from "react-router-dom";
import { postAtom } from "../../../recoil/uploadAtom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Sidebar from "../../Sidebar/Sidebar";
import usePostModal from "../../../Hooks/usePostModal";
import Modal from "../../Modal/Modal";
import bar from "../../../img/bar.svg";
import { EditPost } from "../../../api/Edit.api";
import { detailDate } from "../../common/Date";
import CommentBt from "../../../img/CommentBt.png";

const FeedMenuModal = ({ data }) => {
  const [postId, setPostId] = useRecoilState(postAtom);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userStateAtom);
  const userData = useRecoilValue(userStateAtom);
  const [modal, setModal] = useState(false);
  const [postData, setPostData] = useState(data);
  const { isModify, onChangeModify } = usePostModal();
  const [input, setInput] = useState("");

  const nowDate = detailDate(new Date(data.createDateTime));

  const date = new Date(data.createDateTime);
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const theHours = date.getHours();
  const theMinutes = date.getMinutes();
  const { sentDeleteFeedData } = useFeedMenu();

  // console.log(data);
  const onClick = () => {
    setPostId(data.postId);
    navigate("/comment");
  };

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
    console.log(data);
  }, []);

  const changeTagColor = () => {
    switch (data.tag) {
      case "WEB":
        return "#F19F62";
      case "DESIGN":
        return "#EC6B77";
      case "SERVER":
        return "#628FD3";
      case "ANDROID":
        return "#5AAC73";
      case "IOS":
        return "#4C4C4C";
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
        <img className="able" src={CommentBt} alt={""} onClick={onClick} />
      </div>
      {/* <div className="imgUrl"> */}
      {/* <div className="slideContainer">
        {data.imgUrls && (
          <Slider {...settings}>
            {data.imgUrls.map((item) => {
              return (
                // <img src={item} className="listImage" alt={"listItem img"} />
                <div>{item}</div>
              );
            })}
          </Slider>
        )}
      </div> */}
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
    </div>
  );
};

export default FeedMenuModal;
