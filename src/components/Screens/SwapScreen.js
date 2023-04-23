import React from 'react';
import Breadcrumb from '../Standards/Breadcrumb';
import SwapItems from '../Standards/SwapItems';
import ChatBot from '../ChatBot/ChatBot';
function SwapScreen() {
    return (
        <div>
            <Breadcrumb type="Swap" />
            <SwapItems />
            <ChatBot />
        </div>
    )
}

export default SwapScreen