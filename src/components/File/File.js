import React from "react";
import "./File.css";
import { useState, useRef } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { uploadFileUrl } from "../../store/upload/uploadAtom";

const Prac = ({ upload }) => {


    const [fileUrl, setFileUrl] = useRecoilState(uploadFileUrl);
    const imgRef = useRef();

    const uploadImg = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post("http://10.80.161.249:8080/file/upload", formData);
            setFileUrl(res.data.data.imgUrl)
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            <img src={fileUrl} className="fileimg"></img>
            <input ref={imgRef} onChange={uploadImg} type="file"></input>
        </>
    );
};

export default Prac;
