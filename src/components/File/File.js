import React from "react";
import "./File.css";
import { useState, useRef } from "react";

const Prac = () => {
    const [imageUrl, setImageUrl] = useState(null);
    const imgRef = useRef();

    const onChangeImage = () => {
        const reader = new FileReader();
        const file = imgRef.current.files[0];

        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImageUrl(reader.result);
        };
    };
    return (
        <>
            <img src={imageUrl} className="fileimg"></img>
            <input ref={imgRef} onChange={onChangeImage} type="file"></input>
        </>
    );
};

export default Prac;
