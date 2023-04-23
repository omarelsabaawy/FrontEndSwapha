import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { Button, Spinner } from 'react-bootstrap'

function LoginForm() {
    const location = useLocation();
    const { state } = location;
    const registerData = state && state.registerData;
    const msg = state && state.msg;
    const pass = state && state.pass;
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [values, setValues] = useState({
        email: registerData === null ? "" : registerData.email,
        password: pass === null ? "" : pass,
        rememberMe: true
    });

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toastOptionsError = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark'
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const { email, password, rememberMe } = values;
        const { data } = await axios.post('/api/auth/login', {
            email,
            password,
            rememberMe
        });
        console.log(data.currentUser);
        if (data.status === false) {
            toast.error(data.msg, toastOptionsError);
            setLoading(false);
        } else if (data.status === true) {
            localStorage.setItem('user12345', JSON.stringify(data));
            console.log(JSON.parse(localStorage.getItem('user12345')));
            navigate('/');
            window.location.reload();
            toast.success('Welcome to Swapha', {
                position: 'bottom-right'
            })
            setLoading(false);
        }

    }

    return (
        <div>
            {registerData !== null ? (
                <div>
                    <Alert key="success" variant='success'>
                        {msg}
                    </Alert>
                    <form action="" onSubmit={handleSubmit} class="signin-form">
                        <div class="form-group mb-3">
                            <label class="label" for="name">Email</label>
                            <input
                                type="text"
                                name='email'
                                class="form-control"
                                value={registerData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div class="form-group mb-3">
                            <label class="label" for="password">Password</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    class="form-control"
                                    name='password'
                                    id='password'
                                    value={pass}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    required
                                />
                                <div className="input-group-append">
                                    <button
                                        type='button'
                                        className="btn btn-secondary"
                                        onClick={togglePasswordVisibility} style={{ backgroundColor: 'white', color: 'black', borderColor: '#ccc', borderLeftColor: '#ccc' }}
                                    >
                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <button type="submit" style={{ backgroundColor: '#2a5d65', color: 'white', borderColor: '#2a5d65' }} class="form-control btn btn-primary rounded submit px-3">Sign In</button>
                        </div>
                        <div class="form-group d-md-flex">
                            <div class="w-50 text-left">
                                <label class="checkbox-wrap checkbox-primary mb-0">Remember Me
                                    <input type="checkbox" name='rememberMe' onChange={handleChange} value={values.rememberMe} checked='true' disabled />
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                            <div class="w-50 text-md-right">
                                <Link to="/forgot-password">Forgot Password</Link>
                            </div>
                        </div>
                    </form>
                    <ToastContainer />
                </div>
            ) : (
                <form action="" onSubmit={handleSubmit} class="signin-form">
                    <div class="form-group mb-3">
                        <label class="label" for="name">Email</label>
                        <input
                            type="email"
                            name='email'
                            value={values.email}
                            class="form-control"
                            placeholder="Email"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div class="form-group mb-3">
                        <label class="label" for="password">Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                class="form-control"
                                id='password'
                                value={values.password}
                                name='password'
                                onChange={handleChange}
                                placeholder="Password"
                                required
                            />
                            <div className="input-group-append">
                                <button
                                    type='button'
                                    className="btn btn-secondary"
                                    onClick={togglePasswordVisibility} style={{ backgroundColor: 'white', color: 'black', borderColor: '#ccc', borderLeftColor: '#ccc' }}
                                >
                                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                            {/* <button type="submit" style={{ backgroundColor: '#2a5d65', color: 'white', borderColor: '#2a5d65' }} class="form-control btn btn-primary rounded submit px-3">Sign In</button> */}
                            <Button
                                type='submit'
                                style={{ backgroundColor: '#2a5d65', color: 'white', borderColor: '#2a5d65' }}
                                className="form-control btn btn-primary rounded submit px-3"
                              >
                              {loading ? 
                                <Spinner
                    as="span"
                    variant="light"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    animation="border"/>
                               : "Sign In"}
                              </Button>
                    </div>
                    <div class="form-group d-md-flex">
                        <div class="w-50 text-left">
                            <label class="checkbox-wrap checkbox-primary mb-0">Remember Me
                                <input type="checkbox" name='rememberMe' onChange={handleChange} value={values.rememberMe} checked='true' disabled />
                                <span class="checkmark"></span>
                            </label>
                        </div>
                        <div class="w-50 text-md-right">
                            <Link to="/forgot-password">Forgot Password</Link>
                        </div>
                    </div>
                    <ToastContainer />
                </form>)}
        </div>
    )
}

export default LoginForm