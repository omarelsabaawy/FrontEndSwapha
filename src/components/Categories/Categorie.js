import React from "react";

import { Link } from "react-router-dom"

import image4 from './baner-right-image-04.jpg'
import ps from './ps.jpg';
import furn from './furniture.jpg';
import books from './books.jpg';

function Categrie() {
    return (
        <div>
            <div className="main-banner" id="top">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="left-content" style={{ marginBottom: 20 }}>
                                <div className="thumb">
                                    <div className="inner-content">
                                        <h4>SWAPHA now</h4>
                                        <span>Swap your needless item with an item you want.</span>
                                        <div className="main-border-button">
                                            <Link to="/swap">Swap Now!</Link>
                                        </div>
                                    </div>
                                    <img style={{ height: '647px', borderRadius: "10px" }} src={image4} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="right-content">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="right-first-image">
                                            <div className="thumb" >
                                                <div className="inner-content">
                                                    <h4 style={{ color: 'white' }}>Playstation Games</h4>
                                                    <span style={{ color: 'white' }}>Swap your game with another</span>
                                                </div>
                                                <div className="hover-content" style={{ borderRadius: "10px" }} >
                                                    <div className="inner">
                                                        <h4>Playstation Games</h4>
                                                        <p>Make sure your old game is working well before swapping it.
                                                        </p>
                                                        <div className="main-border-button">
                                                            <Link to="#">Discover More</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <img style={{ maxHeight: '308px', borderRadius: '10px' }} src={ps} alt="image1" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="right-first-image">
                                            <div className="thumb">
                                                <div className="inner-content">
                                                    <h4>Furniture</h4>
                                                    <span>Swap your Furniture here</span>
                                                </div>
                                                <div className="hover-content" style={{ borderRadius: "10px" }}>
                                                    <div className="inner">
                                                        <h4>Furniture</h4>
                                                        <p>Swap your Furniture if you can't afford its transportation.</p>
                                                        <div className="main-border-button">
                                                            <Link to="#">Discover More</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <img src={furn} style={{ borderRadius: '10px' }} alt="image2" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="right-first-image">
                                            <div className="thumb">
                                                <div className="inner-content">
                                                    <h4>Shop Now!</h4>
                                                    <span>Don't like Swapping?</span>
                                                </div>
                                                <div className="hover-content" style={{ borderRadius: "10px" }}>
                                                    <div className="inner">
                                                        <h4>Shop Now</h4>
                                                        <p>you now can buy the product you want if you don't like swapping a product with another.</p>
                                                        <div className="main-border-button">
                                                            <Link to="#">Shop Now</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <img src={books} style={{ borderRadius: '10px' }} alt="image4" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Categrie;