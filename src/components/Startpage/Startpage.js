import React from 'react'
import Startnav from '../Nav/startnav'
import "./Startpage.css";
import IOSimg from "../../img/IOSimg.png";
import Button from "../Button/Button";

export default function Startpage() {
    return (
        <>
            <Startnav />
            <section className='top'>

                <div className='SectionText'>
                    <h1>멘토 멘티 찾기 서비스<br />멘투멘을 만나보세요</h1>
                    <h3>멘투멘은 멘토와 멘티를 서로 이어주는 서비스 입니다</h3>
                </div>

                <div className='Iosimg'>
                    <img className='iosimg' alt='' src={IOSimg} />
                </div>

                <div>
                    {/* 00명의 멘티가 도움을 기다립니다 들어갈 자리  */}
                </div>

            </section>
            <div className='btn'>
                <Button />
            </div>

        </>
    )
}