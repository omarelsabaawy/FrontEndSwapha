import React from 'react'
import { Link } from 'react-router-dom'
import logo from './whiteBackground.png'
import payments from './payment.png'
import { CiMail } from "react-icons/ci";
import { FaExchangeAlt } from 'react-icons/fa';

function footer() {
    return (
        <footer class="footer">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-md-6 col-sm-6">
                        <div class="footer__about">
                            <div class="footer__logo">
                                <Link to="#"><img src={logo} alt="" /></Link>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
                        <div class="footer__widget">
                            <h6>Swap</h6>
                            <ul>
                                <li><Link to="#">Playstation games</Link></li>
                                <li><Link to="#">Furniture</Link></li>
                                <li><Link to="#">Accessories</Link></li>
                                <li><Link to="#">Buy now</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 col-md-3 col-sm-6">
                        <div class="footer__widget">
                            <h6>About us</h6>
                            <ul>
                                <li><Link to="#">Contact Us</Link></li>
                                <li><Link to="#">Payment Methods</Link></li>
                                <li><Link to="#">Return & Exchanges</Link></li>
                                <li><Link to="#">Terms and Conditions</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
                        <div class="footer__widget">
                            {/* <p>SWAP.IT app is the first online platform for swapping and selling items between Users.</p> */}
                            <h6>NewLetter</h6>
                            <div class="footer__newslatter">
                                <p>Be the first to know about new arrivals</p>
                                <form action="#">
                                    <input type="text" placeholder="Your email" />
                                    <button type="submit"><span><CiMail /></span></button>
                                </form>
                            </div>
                        </div>
                        <Link to="#"><img src={payments} alt="" /></Link>

                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-12 text-center">
                        <div class="footer__copyright__text">
                            <p>Copyright ©
                                2022
                                All rights reserved by <Link to="/" >SWAP.IT </Link> <FaExchangeAlt />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer >
    )
}

export default footer