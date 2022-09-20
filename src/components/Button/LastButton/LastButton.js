import React from "react";
import "./LastButton.css";
import { useRecoilState, useRecoilValue } from 'recoil';
import { uploadFileUrl,tagAtom, uploadFileUrlAtom } from '../../../store/upload/uploadAtom';
import axios from 'axios';
import { contentAtom } from '../../../store/upload/uploadcontentAtom';
import { customAxios } from "../../../lib/axios/customAxios";


export default function LastButton() {

    const [fileUrl, setFileUrl] = useRecoilState(uploadFileUrlAtom);
    const [content, setContent] = useRecoilState(contentAtom);
    const [tag, setTag] = useRecoilState(tagAtom);
    //똑같은 함수명으로 하면 안됨!! 

    const upload = async ({res}) => {
        try{
            const data = {
                imgUrl:fileUrl,
                content:content,
                tag:tag,
            }

            const res = await customAxios.post("/post/submit",data);
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
