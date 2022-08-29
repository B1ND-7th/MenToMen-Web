import React from 'react';
import "./Button.css";

export default function (props) {
    const { label, styleClass, disabled } = props;
    const onClick = () => {
        console.log("Click");

    }
    return (
        <button className={styleClass} onClick={onClick} disabled={disabled}>
            {label}<h1>멘투멘 시작하기</h1>
        </button>

    );

}