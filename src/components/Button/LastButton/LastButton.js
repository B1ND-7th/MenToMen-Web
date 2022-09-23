import React from "react";
import "./LastButton.css";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  uploadFileUrl,
  tagAtom,
  uploadFileUrlAtom,
} from "../../../store/upload/uploadAtom";
import axios from "axios";
import { contentAtom } from "../../../store/upload/uploadcontentAtom";
import { customAxios } from "../../../lib/axios/customAxios";
import { useNavigate } from "react-router-dom";

export default function LastButton() {
  const navigate = useNavigate();
  const [fileUrl, setFileUrl] = useRecoilState(uploadFileUrlAtom);
  const [content, setContent] = useRecoilState(contentAtom);
  const [tag, setTag] = useRecoilState(tagAtom);
  
    const upload = async ({res}) => {
       if (!/[^\s]/.test(content) || content === null) {
        window.alert("본문을 입력해주세요");
        return;
       }
      
    try {
      const data = {
        imgUrl: fileUrl,
        content: content,
        tag: tag.toUpperCase(),
      };

      const res = await customAxios.post("/post/submit", data);
      navigate("/list");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="submit">
      <button className="submitBt" onClick={upload}>
        제출하기
      </button>
    </div>
  );
}
