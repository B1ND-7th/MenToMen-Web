import React from "react";
import "./File.css";
import { useState, useRef } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import {
  uploadFileUrl,
  uploadFileUrlAtom,
} from "../../store/upload/uploadAtom";
import { customAxios } from "../../lib/axios/customAxios";
// import imageCompression from "browser-image-compression";

const Prac = ({ upload }) => {
  const [fileUrl, setFileUrl] = useRecoilState(uploadFileUrlAtom);
  const imgRef = useRef();

  const uploadImg = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await customAxios.post("/file/upload", formData);
      setFileUrl(res.data.data[0].imgUrl);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <img src={fileUrl} className="fileimg"></img>
      <input ref={imgRef} onChange={uploadImg} type="file"></input>
    </>
  );
};

export default Prac;
