import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Spinner } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Breadcrumb from './Breadcrumb';
import PreLoader from './PreLoader';
function SwapProducts() {
    const navigate = useNavigate();
    const params = useParams();
    const { _id } = params;
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const globalData = JSON.parse(localStorage.getItem('user12345'));

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${globalData.Token}`
                }
            }
            const { data } = await axios.get(`/api/auth/swapList/${_id}`, config);
            if (data.status === true) {
                const productArray = [];
                (data.products).forEach(product => {
                    productArray.push({
                        name: product.productId.name,
                        slug: product.productId.slug,
                        _id: product.productId._id,
                        imageUrl: product.productId.imageUrl,
                        productOwner: product.productId.userId
                    });
                });
                setProducts([...productArray]);
                setLoading(false);
            }
        }
        fetchData();
    }, [globalData.Token, _id]);

    const deleteProduct = async (prodId, event) => {
        event.preventDefault();
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
            window.location.reload();
            setLoadingDelete(false);
        }
    }

    const goAddProduct = () => {
        navigate(`/add-product-swapList/${globalData.currentUser._id}/${globalData.currentUser.username}`);
    }

    const goEdit = (_id, event) => {
        event.preventDefault();
        navigate(`/editProduct/${_id}`);
    }
    return (

        <div>
            <Breadcrumb type={"SwapList"} />
            <div style={{ margin: '20px' }}>
                <h4 style={{ textAlign: 'center', margin: '30px' }} >Manage Your SwapList</h4>
                <div className="gap-3 d-md-flex justify-content-md-center text-center">
                    <button
                        type="button"
                        className="btn btn-success btn-lg"
                        style={{ margin: '5px' }}
                        onClick={goAddProduct}
                    >
                        Add a new Product
                    </button>

                </div>
                <div style={{ marginBottom: '50px' }}>
                    {products.length > 0 && (<h4 style={{ textAlign: 'center', margin: '30px' }} >Your SwapList Products</h4>)}
                    <div style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 10 }}>
                        <Row>
                            {products.length <= 0 &&
                                (<div>
                                    <h3 style={{ textAlign: 'center', margin: '70px' }}>No Products in your SwapList</h3>
                                </div>)

                            }
                            {
                                loading ?
                                    (<div>
                                        <PreLoader />
                                    </div>)
                                    :
                                    (products.map((product) => (
                                        <Col sm={12} md={6} lg={3} key={product._id}>
                                            <Card className='CardHome' key={product._id}>
                                                <Card.Header style={{ backgroundColor: 'transparent' }}>
                                                    <div style={{ maxHeight: 310 }}>
                                                        <Card.Link href={`/product/${product._id}`}>
                                                            <Card.Img style={{ maxHeight: '310px', maxwidth: '250px', borderRadius: '0.3rem' }} variant="top" src={product.imageUrl} alt={product.name} />
                                                        </Card.Link>
                                                    </div>
                                                </Card.Header>
                                                <Card.Body>
                                                    <Card.Link href={`/product/${product._id}`} style={{ color: 'black' }}>{product.name}</Card.Link>
                                                    <Card.Text>
                                                        Owned by <Card.Link href="/"><span style={{ color: 'grey' }}><Link style={{ color: 'inherit' }} to={`/profile/${product.productOwner}`} >You</Link></span></Card.Link>
                                                    </Card.Text>
                                                </Card.Body>
                                                <Card.Footer style={{ backgroundColor: 'transparent' }}>
                                                    <div>
                                                        <button
                                                            key={product._id}
                                                            type="button"
                                                            className="btn btn-success"
                                                            style={{ margin: '1px', fontSize: '12px', float: 'left' }}
                                                            onClick={(e) => goEdit(product._id, e)}
                                                        >
                                                            Edit a Product
                                                        </button>
                                                        <button
                                                            key={product._id}
                                                            type="button"
                                                            className="btn btn-danger"
                                                            style={{ margin: '1px', fontSize: '12px', float: 'right' }}
                                                            onClick={(e) => deleteProduct(product._id, e)}
                                                        >
                                                            {loadingDelete ?
                                                                <Spinner
                                                                    as="span"
                                                                    variant="light"
                                                                    size="sm"
                                                                    role="status"
                                                                    aria-hidden="true"
                                                                    animation="border"
                                                                />
                                                                :
                                                                "Delete a Product"}
                                                        </button>
                                                    </div>
                                                </Card.Footer>
                                            </Card>
                                        </Col>
                                    ))
                                    )
                            }

                        </Row>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default SwapProducts