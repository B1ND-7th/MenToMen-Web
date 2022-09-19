import React from 'react'
import "./LastButton.css";
import { useRecoilState, useRecoilValue } from 'recoil';
import { uploadFileUrl,tagAtom } from '../../../store/upload/uploadAtom';
import axios from 'axios';
import { contentAtom } from '../../../store/upload/uploadcontentAtom';


export default function LastButton() {

    const [fileUrl, setFileUrl] = useRecoilState(uploadFileUrl);
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

            const res = await axios.post("http://10.80.161.249:8080/post/submit",data);
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
