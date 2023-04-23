import React, { useEffect, useReducer } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import PreLoader from '../Standards/PreLoader';
import Breadcrumb from '../Standards/Breadcrumb';
import ProductInfo from '../Standards/ProductInfo';
import ErrorMessage from './ErrorMessage';
import ChatBot from "../ChatBot/ChatBot";
import { getError } from '../../utils';



const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true }; //for the loading box.
        case 'FETCH_SUCCESS':
            return { ...state, product: action.payload, loading: false }; // for the data that is coming from the action
        case 'FETCH_FAIL':
            return { ...state, error: action.payload, loading: false };
        default:
            return state;
    }
}

function ProductDetails() {
    const params = useParams();
    const { _id } = params;

    const [{ loading, product, error }, dispatch] = useReducer(reducer, {
        loading: true, product: [], error: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' })
            try {
                const result = await axios.get(`/api/products/slug/${_id}`);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(error) })
            }
        }
        fetchData();
    }, [_id]);

    return (
        <div>
            {console.log(product)}
            {
                loading ?
                    (<PreLoader />)
                    : error ? (
                        <ErrorMessage> {error} </ErrorMessage>
                    ) :
                        (
                            <div>
                                <Breadcrumb type={product.name} />
                                <ProductInfo product={product} />
                            </div>
                        )
            }
            <ChatBot />
        </div>
    )
}

export default ProductDetails