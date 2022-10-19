import React from "react";
import { useRecoilState } from "recoil";
import "./CommentBt.css";
import {
  postAtom,
  commentAtom,
  commentListAtom,
} from "../../../recoil/uploadAtom";
import { customAxios } from "../../../lib/axios/customAxios";
import commentApi from "../../../api/auth/Comment.api";
import send from "../../../img/send.png";

export default function CommentBt() {
  const [comment, setComment] = useRecoilState(commentAtom);
  const [postId, setPostid] = useRecoilState(postAtom);
  const [commentList, setCommentList] = useRecoilState(commentListAtom);

  const loadCommentFromServer = async () => {
    try {
      const { data } = await commentApi(postId);
      setCommentList(data);
    } catch (e) {
      console.error(e);
    }
  };

  const commentupload = async ({}) => {
    try {
      const comments = {
        content: comment,
        postId: postId,
      };

      const bt = await customAxios.post("/comment/submit", comments);

      await loadCommentFromServer();
      setComment("");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="CommentBt">
      <img src={send} alt="" onClick={commentupload} className="sendBt" />
    </div>
  );
}
