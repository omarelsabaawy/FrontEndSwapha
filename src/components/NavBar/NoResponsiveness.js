import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { Badge, OverlayTrigger, Tooltip } from 'react-bootstrap'
import logo from './NavImages/logo.png';
// import ReactCountryFlag from "react-country-flag"

// import countries from './countries.json';


import Items from './Items';
import { FaAppStore, FaSearch, FaRegHeart, FaExchangeAlt } from "react-icons/fa";

function NoResponsiveness(props) {
    const user = props.user;
    const navigate = useNavigate();

    function handleLogout() {
        navigate('/signIn');
        localStorage.removeItem("user12345");
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

    // const [selectedCountry, setSelectedCountry] = useState(null);

    // const handleCountrySelect = (countryCode) => {
    //     setSelectedCountry(countryCode);
    // };

    return (
        <header className="header">
            <div className="header__top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-7">
                            <div className="header__top__left">
                                {/* style={{ fontWeight: 'bold', paddingTop: 7 }} */}
                                <p>You can Download SWAPHA App from  <span> <Link style={{ color: 'white' }} to='/'> AppStore <FaAppStore style={{ fontSize: "20px" }} /> </Link> </span> </p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-5">
                            <div className="header__top__right">
                                {user === "" && (
                                    <div>
                                        <div className="header__top__links">
                                            <Link to="/signIn">Sign in</Link>
                                        </div>
                                        <div className="header__top__links">
                                            <Link to="/signUp">Create a new Account</Link>
                                        </div>
                                        {/* </div><div className="header__top__links">
                                            <ReactCountryFlag
                                                countryCode="EG"
                                                svg
                                                style={{
                                                    width: '2em',
                                                    height: '2em',
                                                }}
                                                title="EG"
                                            />
                                        </div> */}
                                    </div>)}
                                {user && (
                                    <div>
                                        <div className="header__top__links">
                                            <Link to={`/profile/${user._id}`}>your profile</Link>
                                        </div>
                                        <div className="header__top__links">
                                            <Link to="/inbox">inbox</Link>
                                        </div>
                                        <div className="header__top__links">
                                            <button onClick={handleLogout} style={{ backgroundColor: "transparent", borderColor: 'transparent' }} ><Link>Logout</Link></button>
                                        </div>
                                        {/* <div className="header__top__links">
                                            <ReactCountryFlag
                                                countryCode="EG"
                                                svg
                                                style={{
                                                    width: '2em',
                                                    height: '2em',
                                                }}
                                                title="EG"
                                            />
                                        </div> */}
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                        <div className="header__logo">
                            <Link to="/"><img src={logo} alt="" /></Link>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <nav className="header__menu mobile-menu">
                            <Items />
                        </nav>
                    </div>
                    <div className="col-lg-3 col-md-3">
                        <div className="header__nav__option">
                            <Link to="#" className="search-switch">
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
                            {!user ? (
                                <><Link to="/signIn" className="Lists">
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

                                    <Link to="/signIn" className="Lists">
                                        <OverlayTrigger
                                            placement="bottom"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={renderTooltipSwapList}
                                        >
                                            <Button variant='transparent'>
                                                <FaExchangeAlt style={{ color: 'black' }} />
                                            </Button>
                                        </OverlayTrigger>
                                    </Link></>
                            ) : (
                                <>
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
                                </>
                            )}


                        </div>
                    </div>
                </div>
                <div className="canvas__open"><i className="fa fa-bars"></i></div>
            </div>
        </header >
    );
}

export default NoResponsiveness;