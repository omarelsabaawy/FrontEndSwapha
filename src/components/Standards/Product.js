import React from 'react'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { FaHeart, FaPlus, FaExchangeAlt } from 'react-icons/fa';
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

function Product(props) {

    const { product } = props;

    const renderTooltipWishList = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            add to wishlist
        </Tooltip>
    );
    const renderTooltipSwapList = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Contact Owner for swapping
        </Tooltip>
    );
    const renderTooltipMoreDetails = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            More Details
        </Tooltip>
    );

    const renderTooltipCanSwap = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Available for Swapping
        </Tooltip>
    );
    const renderTooltipCannotSwap = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Not Available for Swapping
        </Tooltip>
    );

    const renderTooltipCannotBuy = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Not Available for Buying
        </Tooltip>
    );

    const renderTooltipCanBuy = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Available for Buying
        </Tooltip>
    );


    return (
        <div>
            <Card key={product._id} className='CardHome' style={{ marginTop: "30px", borderRadius: '1rem' }}>
                <Card.Header style={{ backgroundColor: 'transparent' }}>
                    <div style={{ maxHeight: 310 }}>
                        <Card.Link href={`/${localStorage.getItem('location')}/product/${product._id}`}>
                            <Card.Img style={{ height: '270px', maxwidth: '250px', borderRadius: '0.3rem' }} variant="top" src={product.imageUrl} alt={product.name} />
                        </Card.Link>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Link href={`/${localStorage.getItem('location')}/product/${product._id}`} style={{ color: 'black' }}>{product.name}</Card.Link>
                    <Card.Text>
                        <Row>
                            <Col xs={12} sm={4} md={4} lg={4} >
                                <Button variant='transparent' style={{ borderColor: 'transparent', color: 'grey', fontSize: '14px' }}>Available</Button>
                            </Col>
                            <Col xs={12} sm={4} md={4} lg={4} >
                                {product.swap ? (
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltipCanSwap}
                                    >
                                        <Button variant='transparent' style={{ borderColor: 'transparent', color: 'green', fontSize: '14px' }}>Swap</Button>
                                    </OverlayTrigger>
                                ) : (
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltipCannotSwap}
                                    >
                                        <Button variant='transparent' style={{ borderColor: 'transparent', color: 'red', fontSize: '14px' }}>Swap</Button>
                                    </OverlayTrigger>)
                                }
                            </Col>
                            <Col xs={12} sm={4} md={4} lg={4} >
                                {product.buy ? (
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltipCanBuy}
                                    >
                                        <Button variant='transparent' style={{ borderColor: 'transparent', color: 'green', fontSize: '14px' }}>Buy</Button>
                                    </OverlayTrigger>
                                ) : ((
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltipCannotBuy}
                                    >
                                        <Button variant='transparent' style={{ borderColor: 'transparent', color: 'red', fontSize: '14px' }}>Buy</Button>
                                    </OverlayTrigger>))}
                            </Col>
                        </Row>
                    </Card.Text>
                    <Card.Footer style={{ backgroundColor: 'transparent' }}>
                        <Row xs={4} sm={4} md={3} lg={3}>
                            <Col>
                                <Card.Link href='/'>
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltipWishList}
                                    >
                                        <Button variant='transparent'>
                                            <FaHeart />
                                        </Button>
                                    </OverlayTrigger>
                                </Card.Link>
                            </Col>
                            <Col>
                                <Card.Link href='/'>
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltipSwapList}
                                    >
                                        <Button variant='transparent'>
                                            <FaExchangeAlt />
                                        </Button>
                                    </OverlayTrigger>

                                </Card.Link>
                            </Col>
                            <Col>
                                <Card.Link href={`/${localStorage.getItem('location')}/product/${product._id}`}>
                                    <OverlayTrigger
                                        placement="bottom"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltipMoreDetails}
                                    >
                                        <Button variant='transparent'>
                                            <FaPlus />
                                        </Button>
                                    </OverlayTrigger>
                                </Card.Link>
                            </Col>
                        </Row>
                    </Card.Footer>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Product