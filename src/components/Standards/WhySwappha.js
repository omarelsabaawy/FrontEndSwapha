import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import { FaShoppingBasket, FaAppStore, FaAws } from 'react-icons/fa'
import { SiApostrophe } from 'react-icons/si'
import { BiMessage } from 'react-icons/bi'

function WhySwappha() {
    return (
        <div>

            <Row style={{ margin: 50 }}>
                <Col sm={12} md={6} lg={6}>
                    <h2 style={{ textAlign: 'Left', marginBottom: 20 }}>SWAP.IT app is the first online platform for swapping and selling items between Users.</h2>
                </Col>
                <Col sm={12} md={6} lg={6}>
                    <div style={{ textAlign: 'center' }}> <h5 style={{ color: '#5D878C' }}> <span style={{ fontSize: '20px' }}><SiApostrophe /> </span> Start by adding your current location, and then start searching for the item you want, and if it is available on the website with a user
                        don't hesitate and contact the owner of this item, and you both can swap this item by another, or even you can buy it from him.</h5>
                        <br />
                        <h5 style={{ color: '#5D878C' }}>In case you didn't find the item you want you can add this item in your wishlist, and whenever it's available you will get notified by it.</h5>
                    </div>
                </Col>
            </Row>

            <Row style={{ margin: 30, paddingBottom: 50 }}>
                <Col sm={12} md={6} lg={3}>
                    <Card className='CardHome ' style={{ marginTop: "30px", height: '200px' }}>
                        <Card.Header style={{ backgroundColor: 'transparent' }}>
                            <FaShoppingBasket className='iconsWhySwappha' />
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <h4 style={{ textAlign: 'center' }}>Online platform for Swapping and selling products.</h4>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={6} lg={3}>
                    <Card className='CardHome' style={{ marginTop: "30px", height: '200px' }}>
                        <Card.Header style={{ backgroundColor: 'transparent' }}>
                            <BiMessage className='iconsWhySwappha' />
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <h4 style={{ textAlign: 'center' }}>End to end encrypted chatting between users.</h4>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={6} lg={3}>
                    <Card className='CardHome' style={{ marginTop: "30px", height: '200px' }}>
                        <Card.Header style={{ backgroundColor: 'transparent' }}>
                            <FaAppStore className='iconsWhySwappha' />
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <h4 style={{ textAlign: 'center' }}>Download the app now from AppStore.</h4>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col sm={12} md={6} lg={3}>
                    <Card className='CardHome' style={{ marginTop: "30px", height: '200px' }}>
                        <Card.Header style={{ backgroundColor: 'transparent' }}>
                            <FaAws className='iconsWhySwappha' />
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <h4 style={{ textAlign: 'center' }}>The App is Supported by AWS</h4>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </div>
    )
}

export default WhySwappha