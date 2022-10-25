import React, { useEffect, useRef, useState } from "react";
import "./Notice.css";
import notices from "../../img/notice.png";
import darknotices from "../../img/dark-notice.png";
import { customAxios } from "../../lib/axios/customAxios";
import { useRecoilState } from "recoil";
import { NoticeListAtom, postAtom } from "../../recoil/uploadAtom";
import profileImg from "../../img/aprofile.png";
import { useNavigate } from "react-router-dom";
import { detailDate } from "../../components/../components/common/Date";
import noticeImg from "../../img/noticeImg.png";
import darknoticeImg from "../../img/dark-noticeimg.png";
import useDarkMode from "use-dark-mode";

const Sidebar = ({ width = 300 }) => {
  const currentMode = useDarkMode(localStorage.getItem("darkMode"));
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(-width);
  const side = useRef();
  const [noticeList, setNoticeList] = useRecoilState(NoticeListAtom);
  const [postId, setPostId] = useRecoilState(postAtom);
  const navigate = useNavigate();
  const [noticeCheck, setNoticeCheck] = useState();

  const onClicks = (data) => {
    setPostId(data.postId);
    navigate(`/comment/${data.postId}`);
  };

  useEffect(() => {
    // setNoticeCheck(response.noticeStatus);
    // data();
    // toggleMenu();
    NoticeRequest();
  }, []);

  const toggleMenu = async () => {
    setNoticeCheck("None");
    if (xPosition < 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(-width);
      setOpen(false);
    }
  };

  const NoticeRequest = async () => {
    try {
      const response = await customAxios.get("/notice/check");
      const { data } = await customAxios.get("/notice/list");
      setNoticeCheck(response.data.data.noticeStatus);

      console.log(data);
      setNoticeList(data);
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
        {/* <img
          src={notices}
          alt=""
          onClick={() => toggleMenu()}
          className="noticesimg"
        /> */}

        {/* <img src={notices} className="noticesimg" /> */}

        {noticeCheck === "EXIST" ? (
          <img
            src={currentMode.value === true ? darknoticeImg : noticeImg}
            className="noticesimgs"
            onClick={() => toggleMenu()}
            alt=""
          />
        ) : (
          <img
            src={currentMode.value === true ? darknotices : notices}
            className="noticesimg"
            onClick={() => toggleMenu()}
            alt=""
          />
        )}

        <div className="content">
          <h2 className="contentNotice">알림</h2>
        </div>

        <div className="test">
          {noticeList &&
            noticeList.data.map((item) => (
              <>
                <div className="noticeBox">
                  <div className="NotiveDate">
                    {detailDate(new Date(item.createDateTime))}
                  </div>
                  {/* <div className="noticeProfileBox">
                    {item.senderProfileImage ? (
                      <img
                        src={item.senderProfileImage}
                        className="noticeProfile"
                        alt=""
                      />
                    ) : (
                      <img src={profileImg} className="noticeProfile" />
                    )}
                  </div> */}
                  <img
                    src={
                      item.senderProfileImage
                        ? item.senderProfileImage
                        : profileImg
                    }
                    className="noticeProfile"
                  />

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
    </div>
  );
};

export default Sidebar;
