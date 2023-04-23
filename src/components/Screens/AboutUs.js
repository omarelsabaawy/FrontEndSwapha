import React from 'react'
import BreadCrumb from '../Standards/Breadcrumb'
import ChatBot from "../ChatBot/ChatBot";


function AboutUs() {
    return (
        <div>
            <BreadCrumb type="About Us" />
            <div style={{ height: '200px' }}></div>
            <ChatBot />
        </div>
    )
}

export default AboutUs