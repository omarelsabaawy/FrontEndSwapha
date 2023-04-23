import axios from 'axios';
import React, { useEffect, useReducer } from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import PreLoader from './PreLoader';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true }; //for the loading box.
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false }; // for the data that is coming from the action
        case 'FETCH_FAIL':
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
}


function LastViewedItems() {

    const [{ loading, products }, dispatch] = useReducer(reducer, {
        loading: true, products: []
    });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' })
            try {
                const result = await axios.get('/api/products');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error.message })
            }
        }
        fetchData();
    }, []);
    return (
        <div>
            <h4 style={{ textAlign: 'center', padding: 20 }}>Recently Viewed Items</h4>
            <div style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 20 }}>
                <Row>
                    {
                        loading ? (
                            <PreLoader />
                        ) : (
                            products.map((product) => (
                                <Col sm={12} md={6} lg={3}>
                                    <Card key={product.slug} className='CardHome' style={{ marginBottom: 50, borderRadius: '1rem' }}>
                                        <Card.Header style={{ backgroundColor: 'transparent' }}>
                                            <Card.Link href={`/product/${product.slug}`}>
                                                <Card.Img style={{ maxHeight: '310px', maxwidth: '250px', borderRadius: '0.3rem' }} variant="top" src={product.imageUrl} alt={product.name} />
                                            </Card.Link>
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Link href={`/product/${product.slug}`} style={{ color: 'black' }}>{product.name}</Card.Link>
                                            <Card.Text>
                                                Owned by <Card.Link href="/"><span style={{ color: 'grey' }}>{product.owner}</span></Card.Link>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        )}
                </Row>
            </div>
        </div>
    )
}

export default LastViewedItems