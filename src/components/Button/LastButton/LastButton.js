import React from "react";
import "./LastButton.css";
import { useRecoilState } from 'recoil';
import { tagAtom, uploadFileUrlAtom } from '../../../store/upload/uploadAtom';
import { contentAtom } from '../../../store/upload/uploadcontentAtom';
import { customAxios } from "../../../lib/axios/customAxios";
import { useNavigate } from "react-router-dom";


export default function LastButton() {

    const [fileUrl, setFileUrl] = useRecoilState(uploadFileUrlAtom);
    const [content, setContent] = useRecoilState(contentAtom);
    const [tag, setTag] = useRecoilState(tagAtom);
    const navigate = useNavigate();
    //똑같은 함수명으로 하면 안됨!! 

    const upload = async () => {
        try{
            if (content?.length <= 0 || content === null) {
                alert("텍스트를 입력해주세요");
                return;
            }
            const data = {
                imgUrl:fileUrl,
                content:content,
                tag:tag.toUpperCase(), 
            }
            
        
            const res = await customAxios.post("/post/submit",data);
            navigate("/list");
            setContent("");
            setTag("Design");


        }catch(e) {
            console.error(e);
        }    
    }

    return (
        <div className='submit'>
            <button className='submitBt' onClick={upload}>제출하기</button>
        </div>
    )
}
