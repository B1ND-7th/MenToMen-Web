import React from 'react'
import "./StartNav.css";
import logo from "../../img/Logo.png";

export default function startNav() {
    return (
        <nav className='test'>
            <div className='nav'>
                <div className='navList'>
                    <img className='logo' alt='' src={logo} />
                    <h1>서비스 소개</h1>
                </div>
            </div>
        </nav>
    )
}