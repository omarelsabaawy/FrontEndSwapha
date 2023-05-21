import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/esm/Badge";
import Button from 'react-bootstrap/Button';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap'

import { FaAppStore, FaSearch, FaRegHeart, FaExchangeAlt } from "react-icons/fa";

import Items from './Items';

function Responsiveness(props) {
    const user = props.user;
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("user12345");
        navigate('/signIn');
        window.location.reload();
    }

    const renderTooltipWishList = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Your wishlist
        </Tooltip>
    );
    const renderTooltipSwapList = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Your SwapList
        </Tooltip>
    );
    const renderTooltipSearch = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Search
        </Tooltip>
    );
    return (
        <div>
            <div class="offcanvas-menu-overlay"></div>
            <div class="offcanvas-menu-wrapper">
                <div class="offcanvas__option">
                    {(user === "") ? (
                        <div>
                            <div class="offcanvas__links">
                                <Link to="/signIn">Sign in</Link>
                            </div>
                            <div class="offcanvas__links">
                                <Link to="/signUp">Create a new Account</Link>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div class="offcanvas__links">
                                <Link to="/profile">your profile</Link>
                            </div>
                            <div class="offcanvas__links">
                                <Link to="/inbox">inbox</Link>
                            </div>
                            <div class="offcanvas__links">
                                <button onClick={handleLogout} style={{ backgroundColor: "transparent", borderColor: 'transparent', color: 'black' }} ><Link>Logout</Link></button>
                            </div>
                        </div>
                    )}
                </div>
                <div class="offcanvas__nav__option">
                    <Row>
                        <Col xs={4} sm={4} md={4} lg={4}>
                            <Link to="#" class="search-switch">
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipSearch}
                                >
                                    <Button variant='transparent'>
                                        <FaSearch style={{ color: 'black' }} />
                                    </Button>
                                </OverlayTrigger>
                            </Link>
                        </Col>
                        <Col xs={4} sm={4} md={4} lg={4}>
                            <Link to={`/${user._id}/wish-list`} className="Lists">
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipWishList}
                                >
                                    <Button variant='transparent'>
                                        <FaRegHeart style={{ color: 'black' }} />
                                    </Button>
                                </OverlayTrigger>
                            </Link>
                        </Col>
                        <Col xs={4} sm={4} md={4} lg={4}>
                            <Link to={`/${user._id}/swap-list`} className="Lists">
                                <OverlayTrigger
                                    placement="bottom"
                                    delay={{ show: 250, hide: 400 }}
                                    overlay={renderTooltipSwapList}
                                >
                                    <Button variant='transparent'>
                                        <FaExchangeAlt style={{ color: 'black' }} />
                                    </Button>
                                </OverlayTrigger>
                            </Link>
                        </Col>

                    </Row>
                </div>
                <div id="mobile-menu-wrap">
                    <div className="slicknav_nav">
                        <Items />
                    </div>
                </div>
                <div class="offcanvas__text">
                    <hr style={{ height: '3px', color: 'black' }} />
                    <p style={{ fontWeight: 'bold' }}>You can Download SWAPPHA App from  <span> <Link style={{ color: 'black' }} to='/'> AppStore <FaAppStore style={{ fontSize: "20px" }} /> </Link> </span> </p>
                </div>
            </div>

        </div>
    );
}

export default Responsiveness;