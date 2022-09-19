import { useState } from 'react'
import { useRecoilState } from 'recoil';
import "./Input.css";
import {contentAtom} from "../../store/upload/uploadcontentAtom";

function Input() {
    const [textValue, setTextValue] = useRecoilState(contentAtom);
    
    const handleSetValue = (e) => { 
        setTextValue(e.target.value);
    };

    return (
        <div className='input'>
            <div>
                <div className='inputtext'>
                    <h3 className='inputtextElement'>내용</h3>
                </div>
                <textarea
                    placeholder='여기에 입력하세요(내용을 스크롤 하여 확인하세요!)'
                    value={textValue}
                    onChange={(e) => handleSetValue(e)}
                    className="inputbox">
                </textarea>
            </div>
        </div>
    )
}

export default Input;