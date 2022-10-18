import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { userStateAtom } from "../../recoil/userAtom";
import Imgpp from "../../img/imgpp.png";
import "../Ask/Ask.css";
import Aprofile from "../../img/aprofile.png";
import { contentAtom } from "../../recoil/uploadcontentAtom";
import { customAxios } from "../../lib/axios/customAxios";
import { listState } from "../../recoil/listAtom";
import { tagAtom, uploadFileUrlAtom } from "../../recoil/uploadAtom";
import { PLATFORM } from "../../constants/Platform/PLANTFORM";
import Slider from "react-slick";
import no from "../../img/no.png";

const Ask = () => {
  const [userInfo, setUserInfo] = useRecoilState(userStateAtom);
  const [textValue, setTextValue] = useRecoilState(contentAtom);
  const [list, setList] = useRecoilState(listState);
  const [fileUrl, setFileUrl] = useRecoilState(uploadFileUrlAtom);
  const [tag, setTag] = useRecoilState(tagAtom);
  const [select, setSelect] = useRecoilState(tagAtom);
  const imgRef = useRef();
  const [imgs, setImageSrc] = useState([]);
  const date = new Date();

  const uploadImg = async (e) => {
    const files = e.target.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }

    try {
      const { data } = await customAxios.post("/file/upload", formData);
      const arr = [];

      data.data.forEach((value) => {
        arr.push(value);
      });
      setFileUrl(arr);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSetValue = (e) => {
    setTextValue(e.target.value);
  };

  useEffect(() => {
    console.log(list);
    console.log(userInfo);
  }, [list]);

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

  const postAsk = async (content, e) => {
    const data = { content, imgUrls: [{ imgUrl: "" }], tag: "WEB" };
    try {
      const { grade, room, number } = userInfo.stdInfo;
      const formData = new FormData();
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
            content: content,
            tag: tag.toUpperCase(),
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
            {userInfo?.profileImage ? (
              <img src={userInfo?.profileImage} alt=" " className="inputUser" />
            ) : (
              <img src={Aprofile} alt=" " className="inputUser" />
            )}
            <form>
              <input
                className="askInput"
                placeholder="멘토 요청할 내용을 작성하세요"
                onChange={(e) => handleSetValue(e)}
                maxlength="700"
                value={textValue}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    postAsk(textValue, e);
                    e.target.value = "";
                  }
                }}
              />
            </form>
            <label for="input-file">
              <img src={Imgpp} alt="" className="askFile" for="input-file" />
              <input
                ref={imgRef}
                multiple="multiple"
                type="file"
                id="input-file"
                style={{ display: "none" }}
                onChange={(e) => {
                  encodeFileToBase64(e.target.files[0]);
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
            <img src={no} className="NoneImg" alt="" />
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
