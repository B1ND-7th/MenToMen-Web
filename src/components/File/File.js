import React from "react";
import "./File.css";
import { useRef } from "react";

import { useRecoilState } from "recoil";
import { uploadFileUrlAtom } from "../../recoil/uploadAtom";
import { customAxios } from "../../lib/axios/customAxios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import IMGPP from "../../img/imgpp.png";
import no from "../../img/no.png";

const Prac = ({ upload }) => {
  const [fileUrl, setFileUrl] = useRecoilState(uploadFileUrlAtom);
  const imgRef = useRef();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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

  return (
    <>
      <div className="test222">
        {fileUrl.length === 0 ? (
          <img src={no} className="NoneImg" />
        ) : (
          <Slider {...settings} className="test">
            {fileUrl.map((file) => {
              return <img src={file.imgUrl} className="fileimg" />;
            })}
          </Slider>
        )}
      </div>

      <label className="input-file-button" for="input-file">
        <img src={IMGPP} alt="" className="File-Img" />
        <input
          ref={imgRef}
          multiple="multiple"
          onChange={uploadImg}
          type="file"
          id="input-file"
          style={{ display: "none" }}
        ></input>
      </label>
    </>
  );
};

export default Prac;
