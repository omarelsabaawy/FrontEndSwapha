import React, { useEffect, useState } from "react";
import HomeScreen from './components/Screens/HomeScreen';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SwapScreen from "./components/Screens/SwapScreen";
import ShopScreen from "./components/Screens/ShopScreen";
import AboutUs from "./components/Screens/AboutUs";
import ContactUs from "./components/Screens/ContactUs";
import ProductDetails from "./components/Screens/ProductDetails";
import SignIn from "./components/Screens/SignIn";
import SignUp from "./components/Screens/SignUp";
import Error404 from "./components/Screens/Error404";
import NavBar from "./components/NavBar/Navbar";
import Footer from './components/Standards/Footer'
import Profile from "./components/Standards/Profile";
import SwapListScreen from "./components/Screens/SwapListScreen";
import WishListScreen from "./components/Screens/WishListScreen";
import SwapListForm from "./components/Standards/SwapListForm";
import SwapEditForm from "./components/Standards/SwapEditForm";
import Messages from "./components/Standards/Messages";
import SearchProducts from "./components/Standards/SearchProducts";
import WishListForm from "./components/Standards/WishListForm";
import PublicProfile from "./components/Standards/PublicProfile";

function App(props) {

    const globalData = JSON.parse(localStorage.getItem('user12345'));
    console.log(globalData);

    const [currentLong, setCurrentLong] = useState();
    const [currentLat, setCurrentLat] = useState();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    function showPosition(position) {
        setCurrentLat(position.coords.latitude);
        setCurrentLong(position.coords.longitude);
    }

    if (localStorage.getItem('location') === null) {
        const API_KEY = "71379cc6d66a491883c9339c9906f3e0";
        const LATITUDE = currentLat;
        const LONGITUDE = currentLong;

        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${LATITUDE}+${LONGITUDE}&key=${API_KEY}&language=en`)
            .then(response => response.json())
            .then(data => {
                const country = data.results[0].components.country;
                console.log(country);
                localStorage.setItem('location', country);
                window.location.reload();
            })
            .catch(error => {
                console.error(error);
            });
    } else {
        console.log(localStorage.getItem('location'));
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [props.location]);

    if (globalData !== null) {
        return (
            <>
                <BrowserRouter>
                    <NavBar user={globalData.currentUser} />
                    <Routes>
                        <Route path="/" element={<HomeScreen />} />
                        <Route path="/:country/swap" element={<SwapScreen />} />
                        <Route path="/:_id/swap-list" element={<SwapListScreen />} />
                        <Route path="/add-product-swapList/:userId/:username" element={<SwapListForm />} />
                        <Route path="/add-product-wishlist/:userId/:username" element={<WishListForm />} />
                        <Route path="/editProduct/:_id" element={<SwapEditForm />} />
                        <Route path="/:_id/wish-list" element={<WishListScreen />} />
                        <Route path="/:country/Buy" element={<ShopScreen />} />
                        <Route path="/aboutUs" element={<AboutUs />} />
                        <Route path="/contactUs" element={<ContactUs />} />
                        <Route path="/:country/product/:_id" element={<ProductDetails />} />
                        <Route path="/product/:_id" element={<ProductDetails />} />
                        <Route path="/profile/:_id" element={<Profile />} />
                        <Route path='/publicProfile/:_id' element={<PublicProfile />} />
                        <Route path="/inbox" element={<Messages />} />
                        <Route path="/:country/search/:query" element={<SearchProducts />} />
                        <Route path="*" element={<Error404 />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </>
        );
    } else {
        return (
            <>
                <BrowserRouter>
                    <NavBar user={""} />
                    <Routes>
                        <Route path="/" element={<HomeScreen />} />
                        <Route path="/:country/swap" element={<SwapScreen />} />
                        <Route path="/:country/buy" element={<ShopScreen />} />
                        <Route path="/aboutUs" element={<AboutUs />} />
                        <Route path="/signIn" element={<SignIn />} />
                        <Route path="/signUp" element={<SignUp />} />
                        <Route path="/contactUs" element={<ContactUs />} />
                        <Route path="/:country/product/:_id" element={<SignIn />} />
                        <Route path="/:country/search/:query" element={<SearchProducts />} />
                        <Route path="*" element={<Error404 />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>
            </>
        );
    }


}

export default App;