import React from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'

function Subscriptions() {
    return (
        <div style={{ backgroundColor: '#255459', textAlign: 'center', paddingTop: 50 }}>
            <h3 style={{ color: 'white' }} >Subscribe now with SWAP.IT get notified by any new item.</h3>
            <br />
            <div className='subs'>
                <h5>Get notified by any new item you are interested in by Subscribing to ours newsletter</h5>
                <br />

                <Form style={{ textAlign: 'center', maxWidth: '700px', marginLeft: '29%', paddingBottom: 50 }}>
                    <Form.Group>
                        <Row>
                            <Col sm={12} md={6} lg={6}>
                                <Form.Control style={{ borderRadius: '3rem', fontSize: '14px', color: '#255459' }} type='text' placeholder='Enter your Email' />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <Button style={{ marginRight: '100%', backgroundColor: '#fff', borderColor: '#255459', color: '#255459', fontWeight: 'bold', borderRadius: '3rem' }}>Subscribe</Button>
                            </Col>
                        </Row>
                    </Form.Group>
                </Form>

            </div>
        </div>
    )
}

export default Subscriptions