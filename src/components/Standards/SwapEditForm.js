import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Breadcrumb from './Breadcrumb'
import { Spinner } from "react-bootstrap"


function SwapEditForm() {
    const params = useParams();
    const { _id } = params;

    const globalData = JSON.parse(localStorage.getItem('user12345'));
    const [loading, setLoading] = useState(false);

    const [values, setValues] = useState({
        id: "",
        name: "",
        slug: "",
        category: "",
        price: "",
        swap: "",
        buy: "",
        desc: "",
        imageUrl: "",
        owner: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            axios.get(`/api/products/slug/${_id}`)
                .then(product => {
                    setValues(product.data);
                })
                .catch(err => {
                    console.log(err);
                });
        }
        fetchData();
    }, [_id]);

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const config = {
            headers: {
                Authorization: `Bearer ${globalData.Token}`
            }
        }
        const { name, category, price, swap, buy, desc, imageUrl, slug } = values;
        const { data } = await axios.post(`/api/auth/editProduct/${values._id}`, {
            name, category, price, swap, buy, desc, imageUrl, slug
        }, config);

        console.log(data);

        if (data.status === true) {
            window.history.back();
            setLoading(false);
        }
    }

    return (
        <>
            <Breadcrumb type={`Edit ${values.name}`} />
            <div style={{ margin: '20px' }}>
                <form onSubmit={handleSubmit} className="file-upload">
                    <div className="row mb-5 gx-5">
                        {/* <!-- Contact detail --> */}
                        <div className="col-xxl-8 mb-5 mb-xxl-0">
                            <div className="bg-secondary-soft px-4 py-5 rounded">
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Product Name *</label>
                                        <input type="text" className="form-control" name='name' value={values.name} onChange={(e) => handleChange(e)} />
                                        <input type="hidden" className="form-control" name='imageUrl' value={values.imageUrl} onChange={(e) => handleChange(e)} />
                                        <input type="hidden" className="form-control" name='slug' value={values.slug} onChange={(e) => handleChange(e)} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Product category *</label>
                                        <input type="text" className="form-control" name='category' value={values.category} onChange={(e) => handleChange(e)} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Description *</label>
                                        <textarea className="form-control" name='desc' value={values.desc} onChange={(e) => handleChange(e)} />
                                    </div>

                                    <div className="col-md-6">
                                        <label for="" className="form-label">Want to Swap it *</label>
                                        <select style={{ height: '48px' }} className="form-control" value={values.swap} placeholder='Select an Option' name='swap' onChange={(e) => handleChange(e)}>
                                            <option></option>
                                            <option value="true" >Yes</option>
                                            <option value="false" >No</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6">
                                        <label for="" className="form-label">Want to Sell it *</label>
                                        <select style={{ height: '48px' }} className="form-control" placeholder='Select an Option' name='buy' value={values.buy} onChange={(e) => handleChange(e)}>
                                            <option></option>
                                            <option value="true" >Yes</option>
                                            <option value="false" >No</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Price *</label>
                                        <input type="text" className="form-control" name='price' value={values.price} onChange={(e) => handleChange(e)} />
                                    </div>

                                </div>
                            </div>
                            {/* <!-- button --> */}
                            <div className="text-center" style={{ margin: '20px' }}>
                                <button
                                    type="submit"
                                    className="btn btn-success btn-lg"
                                    style={{ marginRight: '10px' }}
                                >
                                    {loading ?
                                        <Spinner
                                            as="span"
                                            variant="light"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            animation="border" />
                                        :
                                        "Edit Product"}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default SwapEditForm