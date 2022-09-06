import React from 'react'
import File from "../../components/File/File";
import Nav from "../../components/Nav/StartNav";
import Input from '../../components/Input/Input';
import "../Inputpage/Inputpage.css";
import Select from "../../components/Select/Select";
import LastButton from '../../components/Button/LastButton/LastButton';


export default function Inputpage() {
    return (
        <div>

            <div className='Navbar'>
                <Nav />
            </div>
            <div className='text'>
                <h3>멘토 요청하기</h3>
            </div>

            <div className='File'>
                <File />
            </div>

            <div className='Input'>
                <Input />
            </div>

            <div className='text'>
                <h3>분야</h3>
            </div>

            <div className='Select'>
                <Select />
            </div>

            <div className='LastButton'>
                <LastButton />
            </div>
        </div>
    )
}