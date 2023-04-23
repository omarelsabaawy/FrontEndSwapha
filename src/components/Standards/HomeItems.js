import React, { useEffect, useReducer } from 'react'
import axios from 'axios';
import logger from 'use-reducer-logger';


import Row from 'react-bootstrap/Row'

import { Col } from 'react-bootstrap';

import Product from '../Standards/Product';
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

function HomeItems() {

    const [{ loading, products }, dispatch] = useReducer(logger(reducer), {
        loading: true, products: []
    });
    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' })
            try {
                const result = await axios.get('/api/homeProducts');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: error.message })
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <Row style={{ margin: 30, paddingBottom: 50 }}>
                {
                    loading ? (
                        <PreLoader />
                    ) : (
                        products.map((product) => (
                            <Col key={product.slug} sm={12} md={6} lg={3}>
                                <Product product={product} />
                            </Col>

                        ))
                    )}
            </Row>
        </div>
    )
}

export default HomeItems