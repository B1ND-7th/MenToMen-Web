import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { userStateAtom } from "../../recoil/userAtom";
import Imgpp from "../../img/imgpp.png";
import DarkImgpp from "../../img/darkimgpp.png";
import "../Ask/Ask.css";
import Aprofile from "../../img/aprofile.png";
import { contentAtom } from "../../recoil/uploadcontentAtom";
import { customAxios } from "../../lib/axios/customAxios";
import { listState } from "../../recoil/listAtom";
import { tagAtom, uploadFileUrlAtom } from "../../recoil/uploadAtom";
import { PLATFORM } from "../../constants/Platform/PLANTFORM";
import Slider from "react-slick";
import no from "../../img/no.png";
import darkno from "../../img/darkno.png";
import { useBeforeunload } from "react-beforeunload";
// import useDarkMode from "use-dark-mode";
import useDarkMode from "use-dark-mode";
import profile from "../../img/profile.png";

const Ask = () => {
  const currentMode = useDarkMode(localStorage.getItem("darkMode"));
  useBeforeunload((event) => {
    if (textValue !== "") {
      event.preventDefault();
    }
  });

  const [userInfo, setUserInfo] = useRecoilState(userStateAtom);
  const [textValue, setTextValue] = useRecoilState(contentAtom);
  const [list, setList] = useRecoilState(listState);
  const [fileUrl, setFileUrl] = useRecoilState(uploadFileUrlAtom);
  const [tag, setTag] = useRecoilState(tagAtom);
  const [select, setSelect] = useRecoilState(tagAtom);
  const imgRef = useRef();
  const [imgs, setImageSrc] = useState([]);
  const [imgfiles, setImgFiles] = useState([]);

  const date = new Date();

  const uploadImg = async () => {
    const formData = new FormData();

    for (let i = 0; i < imgfiles.length; i++) {
      formData.append("file", imgfiles[i]);
    }

    try {
      const { data } = await customAxios.post("/file/upload", formData);
      const arr = [];

      data.data.forEach((value) => {
        arr.push(value);
      });

      postAsk(textValue, arr);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSetValue = (e) => {
    setTextValue(e.target.value);
  };

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc((prev) => [reader.result, ...prev]);
        resolve();
      };
    });
  };

  const postAsk = async (content, imgUrls) => {
    if (content?.length <= 0 || content === null) {
      alert("텍스트를 입력해주세요");
      return;
    }
    const data = {
      content,
      tag: tag.toUpperCase(),
      imgUrls: imgUrls.length === 0 ? [] : imgUrls,
    };

    try {
      const { grade, room, number } = userInfo.stdInfo;
      const res = await customAxios.post("/post/submit", data);
      setList((prev) => {
        return [
          {
            ...data,
            createDateTime: date,
            stdInfo: {
              grade,
              room,
              number,
            },
            userName: userInfo.name,
            content,
            tag: tag.toUpperCase(),
            imgUrls: [...imgUrls.map((item) => item.imgUrl)],
          },
          ...prev,
        ];
      });
    } catch (error) {
      console.log(error);
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
    <>
      <div className="askWrap">
        <div className="askSection">
          <p className="askTitle">멘토 요청하기</p>
          <div className="askMid">
            {/* {userInfo?.profileImage ? (
              <img src={userInfo?.profileImage} alt=" " className="inputUser" />
            ) : (
              <img src={profile} alt=" " className="inputUser" />
            )} */}
            <img src={profile} alt=" " className="inputUser" />
            <form>
              <input
                className="askInput"
                placeholder="멘토 요청할 내용을 작성하세요"
                onChange={(e) => handleSetValue(e)}
                maxlength="700"
                value={textValue}
                onKeyDown={async (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    if (imgs.length === 0) {
                      await postAsk(textValue, imgfiles);
                    } else {
                      await uploadImg();
                    }
                    setTextValue("");
                  }
                }}
              />
            </form>
            <label for="input-file">
              <img
                src={currentMode.value === true ? DarkImgpp : Imgpp}
                alt=""
                className="askFile"
                for="input-file"
              />
              <input
                accept="image/*"
                ref={imgRef}
                multiple
                type="file"
                id="input-file"
                style={{ display: "none" }}
                onChange={async (e) => {
                  await encodeFileToBase64(e.target.files[0]);
                  setImgFiles((prev) => [...prev, e.target.files[0]]);
                }}
              ></input>
            </label>
          </div>
          <div className="askBottom">
            {PLATFORM.map((item) => (
              <button
                style={{
                  border: `1px solid ${item.color}`,
                  backgroundColor: select === item.name && item.color,
                  color: select !== item.name ? item.color : "white",
                }}
                className="DesignBt"
                onClick={() => setSelect(item.name)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
        <div className="showImg">
          {imgs.length === 0 ? (
            <img
              src={currentMode.value === true ? darkno : no}
              className="NoneImg"
              alt=""
            />
          ) : (
            <Slider {...settings} className="test">
              {imgs.map((img) => {
                return <img src={img} className="fileimg" alt="" />;
              })}
            </Slider>
          )}
        </div>
      </div>
    </>
  );
};

export default Ask;
