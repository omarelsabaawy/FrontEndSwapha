import React, { useState } from 'react'
import { Button, Col, OverlayTrigger, Row, Spinner, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Rating from './Rating';
import { toast, ToastContainer } from 'react-toastify';

function ProductInfo(props) {
    const product = props.product;
    const globalData = JSON.parse(localStorage.getItem('user12345'));
    const user = globalData.currentUser;
    const from = user._id;
    const to = product.userId;
    const productId = product._id;
    const [loading, setLoading] = useState(false);

    const sendSwapRequest = async () => {
        setLoading(true);
        const { data } = await axios.post('/api/notification/sendSwapRequest', {
            from, to, productId
        })
        if (data.status === true) {
            toast.success(data.msg, { position: 'bottom-right' });
            setLoading(false);
        } else {
            toast.error(data.msg, { position: 'bottom-right' });
            setLoading(false);
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
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Send a request to swap this product with its owner.</Tooltip>}>
                                <span className="d-inline-block">
                                    <Button onClick={sendSwapRequest} style={{ backgroundColor: '#fff', borderColor: '#255459', width: '170px', height: '70px' }}>
                                        <Link style={{ color: '#255459', fontWeight: 'bold' }}>
                                            {loading ? <Spinner
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
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">Send a request to Buy this product from its owner.</Tooltip>}>
                                <span className="d-inline-block">
                                    <Button style={{ backgroundColor: '#fff', borderColor: '#255459', width: '170px', height: '70px' }}>
                                        <Link style={{ color: '#255459', fontWeight: 'bold' }}>Buy Request</Link>
                                    </Button>
                                </span>
                            </OverlayTrigger>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default ProductInfo