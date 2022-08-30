import React from 'react';
import "./Button.css";

export default function ({ label, disabled }) {
    function onClick() {

    }
    return (
        <button className="startBtn" onClick={onClick} disabled={disabled}>
            {label}<h1>멘투멘 시작하기</h1>
        </button>
    );

}