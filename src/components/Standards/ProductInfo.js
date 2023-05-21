import React, { useEffect, useState } from 'react'
import { Button, Col, OverlayTrigger, Row, Spinner, Tooltip } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Rating from './Rating';
import { toast, ToastContainer } from 'react-toastify';
import io from 'socket.io-client'
var socket;
const ENDPOINT = "http://localhost:8000"
function ProductInfo(props) {
    const product = props.product;
    const globalData = JSON.parse(localStorage.getItem('user12345'));
    const user = globalData.currentUser;
    const from = user._id;
    const to = product.userId;
    const productId = product._id;
    const [loadingSwap, setLoadingSwap] = useState(false);
    const [loadingBuy, setLoadingBuy] = useState(false);
    const [socketConnected, setSocketConnected] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connection", () => setSocketConnected(true));
    }, [user])

    const sendSwapRequest = async () => {
        setLoadingSwap(true);
        const { data } = await axios.post('/api/notification/sendSwapRequest', {
            from, to, productId
        });
        console.log(data.notification);
        if (data.status === true) {
            toast.success(data.msg, { position: 'bottom-right' });
            setLoadingSwap(false);
            socket.emit("Send Swap Request", data.notification);
        } else {
            toast.error(data.msg, { position: 'bottom-right' });
            setLoadingSwap(false);
        }
    }

    const sendBuyRequest = async () => {
        setLoadingBuy(true);
        const { data } = await axios.post('/api/notification/sendBuyRequest', {
            from, to, productId
        })
        console.log(data.notification);
        if (data.status === true) {
            toast.success(data.msg, { position: 'bottom-right' });
            setLoadingBuy(false);
            socket.emit("Send Buy Request", data.notification);
        } else {
            toast.error(data.msg, { position: 'bottom-right' });
            setLoadingBuy(false);
        }
    }

    const finalizeRequest = async (prodId) => {
        setLoadingDelete(true);
        const config = {
            headers: {
                Authorization: `Bearer ${globalData.Token}`
            }
        }
        const { data } = await axios.get(`/api/auth/delete/swapList/${prodId}`, config);
        if (data.status === true) {
            globalData.currentUser = data.currentUser;
            localStorage.setItem('user12345', JSON.stringify(globalData));
            navigate(-1);
            setLoadingDelete(false);
        }
    }

    return (

        <div style={{ padding: 70 }}>
            <ToastContainer />
            <Row>
                {/* Product image */}
                <Col sm={12} md={4} lg={4}>
                    <img style={{ maxWidth: '350px' }} src={product.imageUrl} alt={product.name} />
                </Col>
                {/* Product details */}
                <Col xs={12} sm={12} md={6} lg={6}>
                    <div>
                        <h2 style={{ paddingTop: 10, fontWeight: 'bold100' }}>{product.name}</h2>
                    </div>
                    <div style={{ padding: 10 }}>
                        <h5> <span style={{ color: 'black' }} > <Rating rating={product.rating} /> </span></h5>
                    </div>
                    <div style={{ padding: 10 }}>
                        <h5 style={{ fontWeight: 'bold' }}>Category: </h5>
                        <h5 style={{ padding: 10, color: 'grey' }}>{product.category}</h5>
                    </div>
                    {
                        product.buy ? (<div style={{ padding: 10 }}>
                            <h5 style={{ fontWeight: 'bold' }}>Price: </h5>
                            <h5 style={{ padding: 10 }}>$ {product.price}</h5>
                        </div>)
                            :
                            (<div style={{ padding: 10 }}>
                                <h5 style={{ fontWeight: 'bold' }}>Price: </h5>
                                <h5 style={{ padding: 10, color: 'red', fontSize: '18px' }}>This Product is available for Swapping only.</h5>
                            </div>)
                    }
                    <div style={{ padding: 10 }}>
                        <h5 style={{ fontWeight: 'bold' }}>Description: </h5>
                        <dd style={{ padding: 10, fontSize: '18px', maxWidth: '500px' }}>{product.desc}</dd>
                    </div>
                    <div style={{ padding: 10 }}>
                        <Row>
                            <Col xs={6} sm={6} md={3} lg={4} >
                                {product.swap ? (<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">This Product is available for swapping by contacting the owner.</Tooltip>}>
                                    <span className="d-inline-block">
                                        <Button style={{ pointerEvents: 'none', float: 'right', backgroundColor: 'green', borderColor: 'green', borderRadius: '1rem', width: '175px' }}>
                                            Available to Swap
                                        </Button>
                                    </span>
                                </OverlayTrigger>) : (<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">This Product is Not Available for Swapping.</Tooltip>}>
                                    <span className="d-inline-block">
                                        <Button style={{ pointerEvents: 'none', float: 'right', backgroundColor: 'red', borderColor: 'red', borderRadius: '1rem', width: '175px' }}>
                                            Unavailable to Swap
                                        </Button>
                                    </span>
                                </OverlayTrigger>)}
                            </Col>
                            <Col xs={6} sm={6} md={3} lg={4}>
                                {product.buy ? (<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">This Product is available for Buying by contacting the owner.</Tooltip>}>
                                    <span className="d-inline-block">
                                        <Button style={{ pointerEvents: 'none', float: 'left', backgroundColor: 'green', borderColor: 'green', borderRadius: '1rem', width: '175px' }}>
                                            Available to Buy
                                        </Button>
                                    </span>
                                </OverlayTrigger>) : (<OverlayTrigger overlay={<Tooltip id="tooltip-disabled">This Product is Not Available for Buying.</Tooltip>}>
                                    <span className="d-inline-block">
                                        <Button style={{ pointerEvents: 'none', float: 'left', backgroundColor: 'red', borderColor: 'red', borderRadius: '1rem', width: '175px' }}>
                                            Unavailable to Buy
                                        </Button>
                                    </span>
                                </OverlayTrigger>)}
                            </Col>
                        </Row>
                    </div>

                </Col>
                {/* contact user */}
                <Col sm={12} md={2} lg={2}>
                    <div style={{ paddingTop: 100 }}>
                        <h5 style={{ fontWeight: 'bold' }}>Owner:</h5>
                        <h5 style={{ padding: 10, fontSize: '18px' }}><Link style={{ color: '#b7b7b7' }} to="#">{product.owner}</Link></h5>
                    </div>
                    <div style={{ paddingTop: 10 }}>
                        <h5 style={{ fontWeight: 'bold' }}>Phone Number:</h5>
                        <h5 style={{ padding: 10, fontSize: '18px' }}><Link style={{ color: '#b7b7b7' }} to="#">+0xxxxxxxxxx</Link></h5>
                    </div>

                    <div>
                        <div style={{ paddingTop: 10 }}>
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">
                                {product.swap ? "Send a request to swap this product with its owner." : "Sorry This product is not available for swapping"}
                            </Tooltip>}>
                                <span className="d-inline-block">
                                    <Button
                                        onClick={sendSwapRequest}
                                        style={{ backgroundColor: '#fff', borderColor: '#255459', width: '170px', height: '70px' }}
                                        disabled={product.swap ? false : true}
                                    >
                                        <Link style={{ color: '#255459', fontWeight: 'bold' }}>
                                            {loadingSwap ? <Spinner
                                                as="span"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                animation="border" />
                                                :
                                                "Swap Request"
                                            }
                                        </Link>
                                    </Button>
                                </span>
                            </OverlayTrigger>
                        </div>
                        <div style={{ paddingTop: 10 }}>
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">
                                {product.buy ? "Send a request to Buy this product from its owner." : "Sorry This product is not available to buy"}
                            </Tooltip>}>
                                <span className="d-inline-block">
                                    <Button
                                        onClick={sendBuyRequest}
                                        style={{ backgroundColor: '#fff', borderColor: '#255459', width: '170px', height: '70px' }}
                                        disabled={product.buy ? false : true}
                                    >
                                        <Link style={{ color: '#255459', fontWeight: 'bold' }}>
                                            {loadingBuy ? <Spinner
                                                as="span"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                animation="border" />
                                                :
                                                "Buy Request"
                                            }</Link>
                                    </Button>
                                </span>
                            </OverlayTrigger>
                        </div>
                        {user._id === product.userId && (
                            <div style={{ paddingTop: 10 }}>
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Delete the product When you find the best user to swap the product with.</Tooltip>}>
                                    <span className="d-inline-block">
                                        <Button
                                            onClick={() => finalizeRequest(product._id)}
                                            style={{ backgroundColor: '#fff', borderColor: '#255459', width: '170px', height: '70px' }}>
                                            <Link style={{ color: '#255459', fontWeight: 'bold' }}>
                                                {loadingDelete ? <Spinner
                                                    as="span"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    animation="border" />
                                                    :
                                                    "Finalize Request"
                                                }</Link>
                                        </Button>
                                    </span>
                                </OverlayTrigger>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default ProductInfo