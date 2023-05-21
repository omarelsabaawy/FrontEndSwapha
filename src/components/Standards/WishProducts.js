import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Spinner } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Breadcrumb from './Breadcrumb';
import PreLoader from './PreLoader';
function WishProducts() {
    const navigate = useNavigate();
    const params = useParams();
    const { _id } = params;
    const [products, setProducts] = useState([]);
    const [predictedProducts, setPredictedProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const globalData = JSON.parse(localStorage.getItem('user12345'));
    const [predictLoading, setPredictLoading] = useState(false);

    useEffect(() => {
        const handleRoute = () => {
            if (globalData.currentUser._id !== _id) {
                navigate('*');
            }
        }
        handleRoute();
    }, [globalData.currentUser._id, _id, navigate])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${globalData.Token}`
                }
            }
            const { data } = await axios.get(`/api/auth/wishlist/${_id}`, config);
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

    useEffect(() => {
        const makePrediction = async () => {
            setPredictLoading(true);
            const { data } = await axios.get(`http://127.0.0.1:5000/predict/products/${_id}`);
            if (data.status) {
                setPredictedProducts(data.products);
                setPredictLoading(false);
            } else {
                setPredictLoading(false);
            }
        }
        makePrediction();
    }, [_id])


    const deleteProduct = async (prodId, event) => {
        event.preventDefault();
        setLoadingDelete(true);
        const config = {
            headers: {
                Authorization: `Bearer ${globalData.Token}`
            }
        }
        const { data } = await axios.get(`/api/auth/delete/wishlist/${prodId}`, config);
        if (data.status === true) {
            globalData.currentUser = data.currentUser;
            localStorage.setItem('user12345', JSON.stringify(globalData));
            window.location.reload();
            setLoadingDelete(false);
        }
    }

    const goAddProduct = () => {
        navigate(`/add-product-wishlist/${globalData.currentUser._id}/${globalData.currentUser.username}`);
    }

    const goEdit = (_id, event) => {
        event.preventDefault();
        navigate(`/editProduct/${_id}`);
    }

    return (

        <div>
            <Breadcrumb type={"WishList"} />
            <div style={{ margin: '20px' }}>
                <h4 style={{ textAlign: 'center', margin: '30px' }} >Manage Your WishList</h4>
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
                    {products.length > 0 && (<h4 style={{ textAlign: 'center', margin: '30px' }} >Your WishList Products</h4>)}
                    <div style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 10 }}>
                        <Row>
                            {products.length <= 0 &&
                                (<div>
                                    <h3 style={{ textAlign: 'center', margin: '70px' }}>No Products in your WishList</h3>
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
                                            <Card className='CardHome' style={{ minHeight: '420px', margin: '5px' }} key={product._id}>
                                                <Card.Header style={{ backgroundColor: 'transparent' }}>
                                                    <div>
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
                <>
                    <h4 style={{ textAlign: 'center', margin: '10px', marginBottom: '25px' }}>Similar products as you Wish</h4>
                    {predictLoading ? (
                        <div>
                            <PreLoader />
                        </div>
                    ) : (
                        <div className="card">
                            <table className="table table-hover">
                                <thead className="text-muted">
                                    <tr>
                                        <th scope="col" width="50%">Product:</th>
                                        <th scope="col" width="25%">Owned by:</th>
                                        <th scope="col" width="25%">Product Similar to you by:</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {predictedProducts.map(product =>
                                        <tr key={product.swap_item_id}>
                                            <td>
                                                <figure className="media">
                                                    <Link to={`/product/${product.item_id}`} style={{ width: '200px' }}>
                                                        <img src={product.imageUrl} alt={product.item_name} /></Link>
                                                    <figcaption style={{ marginLeft: '10px' }}>
                                                        <Link to={`/product/${product.item_id}`} style={{ color: 'black' }}>{product.item_name} </Link>
                                                        <p>{product.desc}</p>
                                                    </figcaption>
                                                </figure>
                                            </td>
                                            <td>
                                                <Link to={`/publicProfile/${product.user_id}`} style={{ color: 'black' }}>{product.owner}</Link>
                                            </td>
                                            <td>
                                                <div>
                                                    {Math.round(product.similarity * 100)}%
                                                </div>
                                            </td>
                                        </tr>
                                    )}

                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            </div>
        </div>

    )
}

export default WishProducts