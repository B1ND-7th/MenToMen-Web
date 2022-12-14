import React from "react";
import "./LastButton.css";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  uploadFileUrl,
  tagAtom,
  uploadFileUrlAtom,
} from "../../../recoil/uploadAtom";
import axios from "axios";
import { contentAtom } from "../../../recoil/uploadcontentAtom";
import { customAxios } from "../../../lib/axios/customAxios";
import { useNavigate } from "react-router-dom";

export default function LastButton() {
  const navigate = useNavigate();
  const [fileUrl, setFileUrl] = useRecoilState(uploadFileUrlAtom);
  const [content, setContent] = useRecoilState(contentAtom);
  const [tag, setTag] = useRecoilState(tagAtom);

  const upload = async ({ res }) => {
    try {
      if (content?.length <= 0 || content === null) {
        alert("텍스트를 입력해주세요");
        return;
      }

      const data = {
        imgUrls: fileUrl.length >= 1 ? fileUrl : [{ imgUrl: "" }],
        content: content,
        tag: tag.toUpperCase(),
      };

      const res = await customAxios.post("/post/submit", data);
      navigate("/list");
      setContent("");
      setTag("Design");
      setFileUrl([]);
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
