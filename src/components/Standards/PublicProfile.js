import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './profile.css'
import axios from 'axios';
import { Card, Col, Row } from 'react-bootstrap';
import Breadcrumb from './Breadcrumb'
import LoadingPP from './LoadingPP';

function PublicProfile() {
    const params = useParams();
    const { _id } = params;

    const [user, setUser] = useState([]);
    const [have, setHave] = useState([]);
    const [needs, setNeeds] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            const { data } = await axios.get(`/api/auth/getPublicProfile/${_id}`);
            if (data.status === true) {
                setUser(data.user);
                setNeeds(data.user.need.items);
                setHave(data.user.have.items);
                setLoading(false);
            } else {
                setUser([]);
                setLoading(false);
            }
        }
        fetchUser();
    }, [_id])
    return (
        <>
            {loading ? <LoadingPP /> : (
                <>
                    <Breadcrumb type={`${user.username} profile`} />
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                {/* <!-- Page title --> */}
                                <div className="my-5"></div>
                                {/* <!-- Form START --> */}
                                <form className="file-upload">
                                    <div classNamte="row mb-5 gx-5">
                                        {/* <!-- Contact detail --> */}
                                        <div className="col-xxl-8 mb-5 mb-xxl-0">
                                            <div className="bg-secondary-soft px-4 py-5 rounded">
                                                <div className="row g-3">
                                                    <h4 className="mb-4 mt-0">{user.username}'s Information</h4>

                                                    <div className="col-md-6">
                                                        <label className="form-label">Name *</label>
                                                        <input style={{ color: 'grey' }} type="text" className="form-control" name='name' value={user.name} disabled />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label className="form-label">Username *</label>
                                                        <input style={{ color: 'grey' }} type="text" className="form-control" name='username' value={user.username} disabled />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label className="form-label">Phone number *</label>
                                                        <input style={{ color: 'grey' }} type="tel" className="form-control" name='phoneNumber' value={user.phoneNumber} disabled />
                                                    </div>

                                                    <div className="col-md-6">
                                                        <label for="" className="form-label">Home Address *</label>
                                                        <input style={{ color: 'grey' }} type="text" className="form-control" name='homeAddress' value={user.homeAddress} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                <form className="file-upload">
                                    <div classNamte="row mb-5 gx-5">
                                        {/* <!-- Contact detail --> */}
                                        <div className="col-xxl-8 mb-5 mb-xxl-0">
                                            <div className="bg-secondary-soft px-4 py-5 rounded">
                                                <div className="row g-3">
                                                    <h4 className="mb-4 mt-0">{user.username} need: </h4>
                                                    <Row>
                                                        {needs.map(need =>
                                                            <Col xs={6} sm={6} md={4} lg={3} xl={3}>
                                                                <Link to={`/product/${need.productId._id}`}>
                                                                    <Card key={need.productId._id}>
                                                                        <Card.Header style={{ backgroundColor: 'white' }}>
                                                                            <Card.Img src={need.productId.imageUrl} style={{ height: '200px' }} alt={need.productId.name} />
                                                                        </Card.Header>
                                                                        <Card.Footer style={{ backgroundColor: 'white', textAlign: 'center' }}>
                                                                            <h5 style={{ fontSize: '15px' }}>{need.productId.name}</h5>
                                                                        </Card.Footer>
                                                                    </Card>
                                                                </Link>
                                                            </Col>
                                                        )}
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>

                                <form className="file-upload">
                                    <div classNamte="row mb-5 gx-5">
                                        {/* <!-- Contact detail --> */}
                                        <div className="col-xxl-8 mb-5 mb-xxl-0">
                                            <div className="bg-secondary-soft px-4 py-5 rounded">
                                                <div className="row g-3">
                                                    <h4 className="mb-4 mt-0">{user.username} has: </h4>
                                                    <Row>
                                                        {have.map(have =>
                                                            <Col xs={6} sm={6} md={4} lg={3} xl={3}>
                                                                <Link to={`/product/${have.productId._id}`}>
                                                                    <Card key={have.productId._id}>
                                                                        <Card.Header style={{ backgroundColor: 'white' }}>
                                                                            <Card.Img src={have.productId.imageUrl} style={{ height: '200px' }} alt={have.productId.name} />
                                                                        </Card.Header>
                                                                        <Card.Footer style={{ backgroundColor: 'white', textAlign: 'center' }}>
                                                                            <h5 style={{ fontSize: '15px' }}>{have.productId.name}</h5>
                                                                        </Card.Footer>
                                                                    </Card>
                                                                </Link>
                                                            </Col>
                                                        )}
                                                    </Row>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>

    );

}

export default PublicProfile