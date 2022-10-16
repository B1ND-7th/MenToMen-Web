import React from "react";
import { useRecoilState } from "recoil";
import "./Comment.css";
import { customAxios } from "../../../lib/axios/customAxios";
import { commentAtom, postAtom } from "../../../recoil/uploadAtom";
import { useEffect } from "react";
import { useState } from "react";
import profileimg from "../../../img/aprofile.png";
import CommentBt from "../../Button/CommentButton/CommentBt";
import CommentList from "../CommentList/CommentList";

export default function Comment() {
  const [comment, setComment] = useRecoilState(commentAtom);
  const [postId, setPostid] = useRecoilState(postAtom);
  const [post, setPost] = useState();

  const handeSetComment = (e) => {
    setComment(e.target.value);
  };

  useEffect(() => {
    request();
  }, [postId]);

  const request = async () => {
    try {
      const { data } = await customAxios.get(`/post/read-one/${postId}`);
      setPost(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const changeTagColor = () => {
    switch (post.tag) {
      case "WEB":
        return "#D38D42";
      case "DESIGN":
        return "#D83F67";
      case "SERVER":
        return "#3E89DB";
      case "ANDROID":
        return "#35C174";
      case "IOS":
        return "#4C4C4C";
      default:
        break;
    }
  };
  return (
    post && (
      <div className="postcomment">
        <div className="postcommentbox">
          <div className="postCommentContentWrap">
            <div className="postCommentProfileWrap">
              <div className="ProfileUrl">
                {post.profileUrl ? (
                  <img
                    src={post.profileUrl}
                    className="profileUrl"
                    alt={"listItem profile"}
                  />
                ) : (
                  <img src={profileimg} alt="img" className="ProfileUrl" />
                )}
              </div>
              <div className="postCommentProfileTagWrap">
                <div className="Username">{post.userName}</div>

                <div
                  className="tagBox"
                  style={{
                    border: `1px solid ${changeTagColor()}`,
                    color: `${changeTagColor()}`,
                  }}
                >
                  <div className="Tag">{post.tag}</div>
                </div>
              </div>
            </div>

            <div className="contentBox">{post.content}</div>
          </div>

          <img src={post.imgUrls ? post.imgUrls[0] : ""} className="img" />
        </div>

        <div className="comment">
          <textarea
            placeholder="댓글을 입력해주세요"
            value={comment}
            onChange={(e) => handeSetComment(e)}
            className="commentbox"
          ></textarea>
        </div>
        <div>
          <CommentBt />
        </div>
        <div>
          <CommentList />
        </div>
      </div>
    )
  );
}
