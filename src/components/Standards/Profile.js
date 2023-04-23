import axios from 'axios';
import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import ErrorMessage from '../Screens/ErrorMessage';
import './profile.css'

function Profile() {
    const params = useParams();
    const navigate = useNavigate();
    const { _id } = params;
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const globalData = JSON.parse(localStorage.getItem('user12345'));
    const [user, setUser] = useState(globalData.currentUser);
    const [values, setValues] = useState({
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        country: user.country,
        homeAddress: user.homeAddress,
        password: user.password,
        swaphaManager: user.swaphaManager
    });

    const [passwordValues, setPasswordValues] = useState({
        oldPassword: user.password,
        newPassword: '',
        confirmPassword: ''
    })

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const handleChangePassword = (event) => {
        setPasswordValues({ ...passwordValues, [event.target.name]: event.target.value });
    }

    const deleteUser = async () => {
        setLoadingDelete(true);
        const config = {
            headers: {
                Authorization: `Bearer ${globalData.Token}`
            }
        }
        const { data } = await axios.get(`/api/auth/deleteUser/${user._id}`, config);
        if (data.status === true) {
            localStorage.removeItem("user12345");
            navigate('/signIn');
            window.location.reload();
            toast.success(data.msg, {
                position: 'bottom-right'
            })
            setLoadingDelete(true);
        }
    }

    const editUser = async (event) => {
        event.preventDefault();
        setLoadingEdit(true);
        const config = {
            headers: {
                Authorization: `Bearer ${globalData.Token}`
            }
        }

        const { name, username, email, phoneNumber, country, homeAddress } = values;
        const { data } = await axios.post(`/api/auth/editUser/${user._id}`, {
            name,
            username,
            email,
            phoneNumber,
            country,
            homeAddress
        }, config);

        if (data.status === true) {
            globalData.currentUser = data.currentUser;
            localStorage.setItem('user12345', JSON.stringify(globalData));
            setUser(data.currentUser);
            window.scrollTo(0, 0);
            toast.success(data.msg, { position: 'bottom-right' });
            setLoadingEdit(false);
        } else if (data.status === false) {
            toast.success('didnt updated');
            setLoadingEdit(false);
        }

    }

    if (user._id === _id) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {/* <!-- Page title --> */}
                        <div className="my-5">
                            <h3>My Profile</h3>
                            <hr />
                        </div>
                        {/* <!-- Form START --> */}
                        <form className="file-upload">
                            <div classNamte="row mb-5 gx-5">
                                {/* <!-- Contact detail --> */}
                                <div className="col-xxl-8 mb-5 mb-xxl-0">
                                    <div className="bg-secondary-soft px-4 py-5 rounded">
                                        <div className="row g-3">
                                            <h4 className="mb-4 mt-0">Personal Information</h4>

                                            <div className="col-md-6">
                                                <label className="form-label">Name *</label>
                                                <input type="text" className="form-control" name='name' onChange={handleChange} value={values.name} />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label">Username *</label>
                                                <input type="text" className="form-control" name='username' onChange={handleChange} value={values.username} />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label">Email *</label>
                                                <input type="email" className="form-control" name='email' onChange={handleChange} value={values.email} />
                                            </div>

                                            <div className="col-md-6">
                                                <label className="form-label">Phone number *</label>
                                                <input type="tel" className="form-control" name='phoneNumber' onChange={handleChange} value={values.phoneNumber} />
                                            </div>

                                            <div className="col-md-6">
                                                <label for="" className="form-label">Country *</label>
                                                <input type="text" className="form-control" name='country' onChange={handleChange} value={values.country} />
                                            </div>

                                            <div className="col-md-6">
                                                <label for="" className="form-label">Home Address *</label>
                                                <input type="text" className="form-control" name='homeAddress' onChange={handleChange} value={values.homeAddress} />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xxl-6">
                                <div className="bg-secondary-soft px-4 py-5 rounded">
                                    <div className="row g-3">
                                        <h4 className="my-4">Change Password</h4>
                                        {/* <!-- Old password --> */}
                                        <div className="col-md-6">
                                            <label for="exampleInputPassword1" className="form-label">Old password *</label>
                                            <input type="password" className="form-control" name='oldPassword' id="exampleInputPassword1" onChange={handleChangePassword} />
                                        </div>
                                        {/* <!-- New password --> */}
                                        <div className="col-md-6">
                                            <label for="exampleInputPassword2" className="form-label">New password *</label>
                                            <input type="password" className="form-control" name='newPassword' id="exampleInputPassword2" onChange={handleChangePassword} />
                                        </div>
                                        {/* <!-- Confirm password --> */}
                                        <div className="col-md-12">
                                            <label for="exampleInputPassword3" className="form-label">Confirm Password *</label>
                                            <input type="password" className="form-control" name='confirmPassword' id="exampleInputPassword3" onChange={handleChangePassword} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- button --> */}
                            <div className="gap-3 d-md-flex justify-content-md-end text-center" style={{ margin: '20px' }}>
                                <button
                                    type="button"
                                    className="btn btn-danger btn-lg"
                                    style={{ marginRight: '10px' }}
                                    onClick={deleteUser}
                                >
                                    {loadingDelete ?
                                        <Spinner
                                            as="span"
                                            variant="light"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            animation="border" />
                                        : "Delete User"}
                                </button>
                                <button
                                    type="submit"
                                    className="btn btn-success btn-lg"
                                    onClick={editUser}
                                >
                                    {loadingEdit ?
                                        <Spinner
                                            as="span"
                                            variant="light"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                            animation="border" />
                                        : "Update User"}
                                </button>
                            </div>
                        </form>
                        <ToastContainer />
                    </div>
                </div>
            </div>
        )
    } else {
        return (<ErrorMessage />)
    }
}

export default Profile