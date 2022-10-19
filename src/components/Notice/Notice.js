import React, { useEffect, useRef, useState } from "react";
import "./Notice.css";
import notices from "../../img/notice.png";
import { customAxios } from "../../lib/axios/customAxios";
import { useRecoilState } from "recoil";
import { NoticeListAtom, postAtom } from "../../recoil/uploadAtom";
import profileImg from "../../img/aprofile.png";
import { useNavigate } from "react-router-dom";
import { detailDate } from "../../components/../components/common/Date";

const Sidebar = ({ width = 300 }) => {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(-width);
  const side = useRef();
  const [noticeList, setNoticeList] = useRecoilState(NoticeListAtom);
  const [postId, setPostId] = useRecoilState(postAtom);
  const navigate = useNavigate();
  // const nowDate = detailDate(new Date(data.createDateTime));
  // const [postData, setPostData] = useState(data);

  const onClicks = (data) => {
    setPostId(data.postId);
    navigate(`/comment/${data.postId}`);
  };

  const toggleMenu = async () => {
    try {
      if (xPosition < 0) {
        setX(0);
        setOpen(true);
      } else {
        setX(-width);
        setOpen(false);
      }

      const response = await customAxios.get("/notice/check");
      const res = await customAxios.get("/notice/list");
      console.log(res);
      setNoticeList(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleClose = async (e) => {
    let sideArea = side.current;
    let sideCildren = side.current.contains(e.target);
    if (isOpen && (!sideArea || !sideCildren)) {
      setX(-width);
      setOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClose);
    return () => {
      window.removeEventListener("click", handleClose);
    };
  });

  return (
    <div className="container">
      <div
        ref={side}
        className="sidebar"
        style={{
          width: `${width}px`,
          height: "100%",
          transform: `translatex(${-xPosition}px)`,
        }}
      >
        <img
          src={notices}
          alt=""
          onClick={() => toggleMenu()}
          className="noticesimg"
        />

        <div className="content">
          <h2 className="contentNotice">알림</h2>
        </div>

        {noticeList &&
          noticeList.data.map((item) => (
            <>
              <div className="noticeBox">
                <div className="noticeProfileBox">
                  {item.senderProfileImage ? (
                    <img
                      src={item.senderProfileImage}
                      className="noticeProfile"
                      alt=""
                    />
                  ) : (
                    <img src={profileImg} className="noticeProfile" />
                  )}
                </div>

                <div className="noticeName">
                  <b>{item.senderName}</b>
                  님이 댓글을 입력하셨습니다
                </div>

                <div className="noticeContent" onClick={() => onClicks(item)}>
                  {item.commentContent}
                </div>
              </div>
            </>
          ))}
      </div>
    </div>
  );
};

export default Sidebar;
