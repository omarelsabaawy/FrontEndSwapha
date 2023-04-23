import React from 'react'
import Breadcrumb from '../Standards/Breadcrumb'
import BuyItems from '../Standards/BuyItems'
import ChatBot from '../ChatBot/ChatBot'

function ShopScreen() {
    return (
        <div>
            <Breadcrumb type="Buy Now" />
            <BuyItems />
            <ChatBot />
        </div>
    )
}

export default ShopScreen